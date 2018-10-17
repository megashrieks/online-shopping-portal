let express = require("express");
let router = express.Router();
let { createToken } = require("../../tokens");
router.post("/login", (req, res) => {
	let { login } = require("../../database");
	let username = req.body.username;
	let password = req.body.password;
	login(username, password, (err, rows) => {
		if (err) throw Error(err);
		if (rows.length == 0) {
			console.log("request");
			res.json({ error: "Login failed" });
		} else {
			let token = createToken({
				username: username
			});
			res.json({ error: null, token: token });
		}
	});
});
module.exports = router;
