const path = require("../config/path");
const translatorUsersController = require("../controllers/translatorUsers");

module.exports = (app) => {
	app.get(`${path.translatorUsers}`, translatorUsersController.all);
	app.get(`${path.translatorUsers}:id`, translatorUsersController.findById);
	app.delete(`${path.translatorUsers}:id`, translatorUsersController.delete);
	app.post(`${path.translatorUsers}`, translatorUsersController.create);
	app.put(`${path.translatorUsers}:id`, translatorUsersController.update);
};
