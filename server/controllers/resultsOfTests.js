const ResultsOfTests = require('../models/resultsOfTests');

exports.all = (req, res) => {
    ResultsOfTests.all((err, items) => {
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
	ResultsOfTests.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const resultOfTest = {
        TestDate: req.body.TestDate,
        Result: req.body.Result,
        UserId: req.body.UserId
    };
    
	ResultsOfTests.create(resultOfTest, (err, result) => {
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
    const resultOfTest = {
        TestDate: req.body.TestDate,
        Result: req.body.Result,
        UserName: req.body.UserName
    };

	ResultsOfTests.update(id, resultOfTest, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(resultOfTest);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	ResultsOfTests.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};
