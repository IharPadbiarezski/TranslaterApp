const path = require("../config/path");
const sessionController = require("../controllers/session");

module.exports = (app) => {
    app.post(`${path.login}`, sessionController.login);
    app.post(`${path.status}`, sessionController.status);
    app.post(`${path.logout}`, sessionController.logout);
    app.post(`${path.register}`, sessionController.register);
};
