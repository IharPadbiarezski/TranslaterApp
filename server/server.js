const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const db = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
	secret: "This is a secret",
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7
	},
	store: db.getStore(),
	resave: true,
	saveUninitialized: false,
	httpOnly: false
}));

app.use(cors());

db.connect((err) => {
	if (err) {
		return console.log(err);
	}
	routes(app);
	app.listen(port, () => {
		console.log(`App listening on port ${port}!`);
	});
});
