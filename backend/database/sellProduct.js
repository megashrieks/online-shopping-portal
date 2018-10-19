let connection = require("./connection");
let addProduct = require("./addProduct");
module.exports = (details, callback) => {
	addProduct(details, (err, res) => {
		if (err) throw err;
		let { insertId } = res;
		connection.query(
			`insert into Sells values(?, ?)`,
			[details.username, insertId],
			callback
		);
	});
};
