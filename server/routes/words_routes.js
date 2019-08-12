const path = require("../config/path");
const wordsController = require("../controllers/words");

module.exports = (app) => {
	app.get(`${path.words}`, wordsController.all);
	app.get(`${path.words}:id`, wordsController.findById);
	app.delete(`${path.words}:id`, wordsController.delete);
	app.post(`${path.words}`, wordsController.create);
	app.put(`${path.words}:id`, wordsController.update);
	app.post(`${path.getOptions}`, wordsController.getOptions);
};
