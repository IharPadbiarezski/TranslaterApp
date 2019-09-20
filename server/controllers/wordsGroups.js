const WordsGroups = require("../models/wordsGroups");

exports.all = (req, res) => {
    WordsGroups.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            items.forEach((item) => {
                item.id = item._id;
            });
            res.send(items);
        }
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;
	WordsGroups.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const wordsGroup = {
        Name: req.body.Name,
        CreationDate: req.body.CreationDate,
        Amount: req.body.Amount,
        UserId: req.body.UserId
    };
    
	WordsGroups.create(wordsGroup, (err, result) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            result.ops[0].id = result.insertedId;
            res.send(result.ops[0]);
        }
	});
};

exports.update = (req, res) => {
    const id = req.params.id;
    const wordsGroup = {
        Name: req.body.Name,
        CreationDate: req.body.CreationDate,
        Amount: req.body.Amount
    };

	WordsGroups.update(id, wordsGroup, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(wordsGroup);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	WordsGroups.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
