const path = require("../config/path");
const partsOfSpeechController = require("../controllers/partsOfSpeech");

module.exports = (app) => {
	app.get(`${path.partsOfSpeech}`, partsOfSpeechController.all);
	app.get(`${path.partsOfSpeech}:id`, partsOfSpeechController.findById);
	app.delete(`${path.partsOfSpeech}:id`, partsOfSpeechController.delete);
	app.post(`${path.partsOfSpeech}`, partsOfSpeechController.create);
	app.put(`${path.partsOfSpeech}:id`, partsOfSpeechController.update);
};
