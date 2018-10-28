let express = require("express");
let router = express.Router();
router.post("/buy/:pid", (req, res) => {
	let { buyProduct } = require("../../database");
	let { verifyToken } = require("../../tokens");
	let { pid } = req.params;
	let { count } = req.body;
	console.log(req.params);
	verifyToken(req.headers.token)
		.then(decoded => {
			buyProduct(
				{
					username: decoded.data.username,
					pid,
					count
				},
				err => {
					if (err) throw err;
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
