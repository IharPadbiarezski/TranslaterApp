const ObjectID = require("mongodb").ObjectID;
const db = require("../config/db");

exports.all = (cb) => {
	db.get().collection("resultsOfTests").find().toArray((err, items) => {
		cb(err, items);
	});
};

exports.findById = (id, cb) => {
	db.get().collection("resultsOfTests").findOne({_id: new ObjectID(id)}, (err, item) => {
		cb(err, item);
	});
};

exports.create = (resultOfTest, cb) => {
	db.get().collection("resultsOfTests").insertOne(resultOfTest, (err, result) => {
		cb(err, result);
	});
};

exports.update = (id, resultOfTest, cb) => {
	db.get().collection("resultsOfTests").update({_id: new ObjectID(id)}, resultOfTest, (err) => {
			cb(err);
		}
	);
};

exports.delete = (id, cb) => {
	db.get().collection("resultsOfTests").deleteOne({_id: ObjectID(id)}, (err) => {
			cb(err);
		}
	);
}
