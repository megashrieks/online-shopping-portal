let express = require("express");
let router = express.Router();

router.get("/product/:pid", (req, res) => {
	let { pid } = req.params;
	let { getProduct } = require("../../database");
	getProduct(pid, (err, rows) => {
		if (err) throw err;
		if (rows.length)
			res.json({
				...rows[0],
				error: null
			});
		else
			res.status(404).json({
				error: "Product not found"
			});
	});
});

module.exports = router;
