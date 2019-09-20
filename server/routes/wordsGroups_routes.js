const path = require("../config/path");
const wordsGroupsController = require("../controllers/wordsGroups");

module.exports = (app) => {
	app.get(`${path.wordsGroups}`, wordsGroupsController.all);
	app.get(`${path.wordsGroups}:id`, wordsGroupsController.findById);
	app.delete(`${path.wordsGroups}:id`, wordsGroupsController.delete);
	app.post(`${path.wordsGroups}`, wordsGroupsController.create);
	app.put(`${path.wordsGroups}:id`, wordsGroupsController.update);
};
