let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");

const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use("", require("./backend/routes"));
app.listen(PORT);
