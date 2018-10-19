let express = require("express");
let router = express.Router();
router.post("/sell", (req, res) => {
	let { sellProduct } = require("../../database");
	let { verifyToken } = require("../../tokens");
	let { name, count, price, details } = req.body;
	verifyToken(req.headers.token)
		.then(decoded => {
			sellProduct(
				{
					username: decoded.username,
					name,
					count,
					price,
					details
				},
				err => {
					if (err) throw err;
					res.json({
						error: null,
						data: "sold item successfully"
					});
				}
			);
		})
		.catch(err => {
			res.json({
				error: "login needed"
			});
		});
});
module.exports = router;
