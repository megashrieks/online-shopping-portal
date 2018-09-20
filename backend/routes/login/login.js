let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let { key } = require("../../../secret");
router.post("/login", (req, res) => {
	let connection = require("../../database");
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
			else {
				let token = jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
						data: {
							username: username
						}
					},
					key
				);
				res.json({ error: null, token: token });
			}
		}
	);
});
module.exports = router;
