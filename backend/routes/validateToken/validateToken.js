let express = require("express");
let router = express.Router();
router.post("/validate", (req, res) => {
	let { verifyToken } = require("../../tokens");
	verifyToken(req.headers.token)
		.then(decoded => {
			res.json({
				error: null,
				data: "token valid"
			});
		})
		.catch(err => {
			res.json({
				error: "invalid token"
			});
		});
});
module.exports = router;
