let express = require("express");
let router = express.Router();
router.post("/login", (req, res) => {
	let connection = require("../database/");
	let username = req.body.username;
	let password = req.body.password;
	connection.query(
		"Select * from Customer where username='" +
			username +
			"' and password='" +
			password +
			"'",
		(err, rows) => {
			if (err) throw Error(err);
			if (rows.length == 0) res.json({ error: "Login failed" });
			else res.json({ error: null, data: "Login successful" });
		}
	);
});
module.exports = router;
