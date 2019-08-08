const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(express.static("public"));
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "k12jh40918e4019u3",
	resave: false,
	saveUninitialized:true,
	cookie: { maxAge: 60*60*1000 },
	saveUninitialized: false
	// httpOnly: false ,
	// domain:'127.0.0.1:8080'
  }));
app.use(require('express-session')({
	
	secret: 'This is a secret',
	cookie: {
	  maxAge: 1000 * 60 * 60 * 24 * 7
	},
	store: db.getStore(),
	resave: true,
	saveUninitialized: false,
	httpOnly: false 
	// domain:'127.0.0.1:8080'
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
