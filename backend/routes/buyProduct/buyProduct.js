let express = require("express");
let router = express.Router();
router.post("/buy/:pid", (req, res) => {
	let { buyProduct } = require("../../database");
	let { verifyToken } = require("../../tokens");
	let { pid } = req.params;
	let { count } = req.body;
	verifyToken(req.headers.token)
		.then(decoded => {
			buyProduct(
				{
					username: decoded.data.username,
					pid,
					count
				},
				err => {
					if (err)
						res.json({
							error: "failed to buy product"
						});
					res.json({
						error: null,
						data: "bought item successfully"
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
