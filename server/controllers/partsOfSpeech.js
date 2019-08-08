const PartsOfSpeech = require('../models/partsOfSpeech');

exports.all = (req, res) => {
    PartsOfSpeech.all((err, items) => {
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
	PartsOfSpeech.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const partOfSpeech = {
        value: req.body.value
    };
    
	PartsOfSpeech.create(partOfSpeech, (err, result) => {
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
    const partOfSpeech = {
        value: req.body.value
    };

	PartsOfSpeech.update(id, partOfSpeech, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(partOfSpeech);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	PartsOfSpeech.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
