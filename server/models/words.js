const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("words").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("words").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (word, cb) => {
	db.get().collection("words").insertOne(word, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, word, cb) => {
	db.get().collection("words").update({_id: new ObjectID(id)}, word, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("words").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
