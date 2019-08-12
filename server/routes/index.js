const translatorUsersRoutes = require("./translatorUsers_routes");
const sessionRoutes = require("./session_routes");
const partsOfSpeechRoutes = require("./partsOfSpeech_routes");
const wordsRoutes = require("./words_routes");
const wordsGroupsRoutes = require("./wordsGroups_routes");


module.exports = (app) => {
	translatorUsersRoutes(app);
	sessionRoutes(app);
	partsOfSpeechRoutes(app);
	wordsRoutes(app);
	wordsGroupsRoutes(app);
};
