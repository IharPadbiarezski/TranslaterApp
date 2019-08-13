const Words = require('../models/words');

exports.all = (req, res) => {
    Words.all((err, items) => {
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
	Words.findById(id, (err, item) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(item);
        }
	});
};

exports.create = (req, res) => {
	const word = {
        English: req.body.English,
        Russian: req.body.Russian,
        GroupId: req.body.GroupId,
        PartOfSpeech: req.body.PartOfSpeech,
        UserId: req.body.UserId
    };
    
	Words.create(word, (err, result) => {
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
    const word = {
        English: req.body.English,
        Russian: req.body.Russian,
        GroupId: req.body.GroupId,
        PartOfSpeech: req.body.PartOfSpeech
    };

	Words.update(id, word, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            res.send(word);
        }
		}
	);
};

exports.delete = (req, res) => {
    const id = req.params.id;
	Words.delete(id, (err) => {
        if (err) {
            res.send({error: "An error has occured"});
        }
	});
};

exports.getOptions = (req, res) => {
    groupId = req.query.group;
    const query = {
        UserId: req.query.user
    }
    Words.findMany( query, (err, items) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        else {
            const groupItems = items.filter((item) => item.GroupId === groupId);
            const correctAnswer = groupItems.splice(Math.floor(Math.random() * items.length), 1)[0];
            if (correctAnswer) {
                const possibleAnswers = items.filter((item) => item.PartOfSpeech === correctAnswer.PartOfSpeech);
                let answers = [];
                if (possibleAnswers.length >= 3) {
                    for (let i = 0; i < 3; i++) {
                        const answer = possibleAnswers.splice(Math.floor(Math.random() * possibleAnswers.length), 1)[0];
                        answers.push(answer.Russian);
                    }
                }
                else {
                    answers = possibleAnswers;
                }
                const test = {
                    correctAnswer,
                    answers,
                    WordsAmount: groupItems.length
                }
                res.send(test);
            }
        }
	});
}

exports.getLengthOfAvailableWords = (req, res) => {
    const query = {
        GroupId: req.query.group
    }
    Words.findMany( query, (err, items) => {
		if (err) {
            res.send({error: "An error has occured"});
        }
        res.send({Length: items.length});
	});
}
