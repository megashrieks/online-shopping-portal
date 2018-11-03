let connection = require("./connection");
module.exports = (details, callback) => {
	let { name, price, count, details: detailinfo, image } = details;
	connection.query(
		`
			Insert into Products(prod_name,prod_price,prod_count,prod_details,image)
			values (?,?,?,?,?)
		`,
		[name, price, count, detailinfo, image],
		callback
	);
};
