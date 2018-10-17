let express = require("express");
let router = express.Router();

router.get("/search", (req, res) => {
	let { q: searchItem, quantity: count, lprice, rprice } = req.query;
	let { search } = require("../../database");
	search(searchItem, { count, lprice, rprice }, (err, rows) => {
		if (err) throw err;
		res.json({
			result: rows
		});
	});
});
module.exports = router;
