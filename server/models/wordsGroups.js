const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("wordsGroups").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("wordsGroups").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (partOfSpeech, cb) => {
	db.get().collection("wordsGroups").insertOne(partOfSpeech, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, partOfSpeech, cb) => {
	db.get().collection("wordsGroups").update({_id: new ObjectID(id)}, partOfSpeech, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("wordsGroups").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
