let express = require("express");
let router = express.Router();
let { createToken } = require("../../tokens");
router.post("/register", (req, res) => {
	let { register } = require("../../database");
	let { username, password, email, details } = req.body;
	register(
		{
			username,
			password,
			email,
			details
		},
		err => {
			if (err && err.code == "ER_DUP_ENTRY")
				res.json({
					error: "username already exists"
				});
			else if (err) {
				res.json({
					error: "error adding user"
				});
			} else
				res.json({
					error: null,
					token: createToken({
						username: username
					})
				});
		}
	);
});
module.exports = router;
