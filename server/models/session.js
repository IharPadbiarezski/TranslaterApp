const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.findOne = (query, cb) => {
	db.get().collection("translatorUsers").findOne(query, (err, item) => {
			cb(err, item);
		}
	);
}

exports.find = (query, cb) => {
	db.get().collection("translatorUsers").find(query, (err, item) => {
			cb(err, item);
		}
	);
}

exports.create = (user, cb) => {
	db.get().collection("translatorUsers").insertOne(user, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, user, cb) => {
	db.get().collection("translatorUsers").update({_id: new ObjectID(id)}, user, (err) => {
			cb(err);
		}
	);
};

