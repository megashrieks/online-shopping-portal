let connection = require("./connection");
module.exports = (keyword, options, callback) => {
	let parameters = [options.count || 0, options.lprice, options.rprice];
	let constraint = ` and prod_price
		between ? and ?`;
	if (!(options.lprice && options.rprice)) {
		constraint = "";
		parameters.length -= 2;
	}
	connection.query(
		`Select * from Products where prod_name like '%${keyword}%'
		and prod_count >= ?` + constraint,
		parameters,
		callback
	);
};
