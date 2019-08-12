const path = require("../config/path");
const resultsOfTestsController = require("../controllers/resultsOfTests");

module.exports = (app) => {
	app.get(`${path.resultsOfTests}`, resultsOfTestsController.all);
	app.get(`${path.resultsOfTests}:id`, resultsOfTestsController.findById);
	app.delete(`${path.resultsOfTests}:id`, resultsOfTestsController.delete);
	app.post(`${path.resultsOfTests}`, resultsOfTestsController.create);
	app.put(`${path.resultsOfTests}:id`, resultsOfTestsController.update);
};
