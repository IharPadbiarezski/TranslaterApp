const TranslatorUsers = require('../models/translatorUsers');

exports.all = (req, res) => {
    TranslatorUsers.all((err, items) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            let customId = 0;
            items.forEach((item) => {
                item.id = item._id;
                customId += 1;
                item.customId = customId;
            });
            res.send(items);
        }
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;
	TranslatorUsers.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const translatorUser = {
        Name: req.body.Name,
        Email: req.body.Email,
        CreationDate: req.body.CreationDate,
        Password: req.body.Password
    };
    
	TranslatorUsers.create(translatorUser, (err, result) => {
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
    const translatorUser = {
        Name: req.body.Name,
        Email: req.body.Email,
        CreationDate: req.body.CreationDate,
        Password: req.body.Password
    };

	TranslatorUsers.update(id, translatorUser, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(translatorUser);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	TranslatorUsers.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
