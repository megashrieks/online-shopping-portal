let express = require("express");
let router = express.Router();
router.post("/purchases", (req, res) => {
	let { getPurchases } = require("../../database");
	let { verifyToken } = require("../../tokens");
	verifyToken(req.headers.token)
		.then(decoded => {
			getPurchases(decoded.data.username, (err, rows) => {
				if (err) throw err;
				res.json({
					error: null,
					data: rows
				});
			});
		})
		.catch(err => {
			res.json({
				error: "login needed"
			});
		});
});
module.exports = router;
