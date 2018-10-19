let connection = require("./connection");
module.exports = (details, callback) => {
	let { name, price, count, details: detailinfo } = details;
	connection.query(
		`
			Insert into Products(prod_name,prod_price,prod_count,prod_details)
			values (?,?,?,?)
		`,
		[name, price, count, detailinfo],
		callback
	);
};
