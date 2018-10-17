let connection = require("./connection");
module.exports = (keyword, options, callback) => {
	let constraint = ` and prod_price
		between ${options.lprice} and ${options.rprice}`;
	if (!(options.lprice && options.rprice)) constraint = "";
	connection.query(
		`Select * from Products where prod_name like '%${keyword}%'
		and prod_count >= ${options.count}` + constraint,
		callback
	);
};
