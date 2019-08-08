const MongoClient = require("mongodb").MongoClient;
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);

let state = {
	db: null,
	uri: "mongodb+srv://user:xbsoftware@grok-0r2y1.mongodb.net/test?retryWrites=true&w=majority"
};

exports.connect = (done) => {
	if (state.db) {
		return done();
	}
	const client = new MongoClient(state.uri, {useNewUrlParser: true});
	client.connect((err, db) => {
		if (err) {
			return done(err);
		}
		state.db = db.db("Grok");
		done();
	});
};

exports.get = () => state.db;

const store = new MongoDBStore({
	uri: state.uri,
	collection: "mySessions"
});

store.on("error", function(error) {
	console.log(error);
});

exports.getStore = () => store;