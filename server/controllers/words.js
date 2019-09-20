const Words = require("../models/words");

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
            console.log("error")
        }
        if (items.length > 0) {
            const groupItems = items.filter((item) => item.GroupId === groupId);
            const questionObject = groupItems.splice(Math.floor(Math.random() * groupItems.length ), 1)[0];
            const correctAnswerRussian = questionObject.Russian;
            const questionWordEnglish = questionObject.English;
            const partOfSpeech = questionObject.PartOfSpeech;
            const possibleAnswers = items.filter((item) => item.PartOfSpeech === partOfSpeech);
            const answers = [];
            if (possibleAnswers.length > 1) {
                for (let i = 0; i < 3; i++) {
                    const answer = possibleAnswers.splice(Math.floor(Math.random() * possibleAnswers.length), 1)[0];
                    answers.push(answer.Russian);
                }
            }

            const test = {
                correctAnswer: {
                    Russian: correctAnswerRussian,
                    English: questionWordEnglish
                },
                WordsAmount: groupItems.length,
                partOfSpeech,
                answers
            }
        res.send(test);
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
