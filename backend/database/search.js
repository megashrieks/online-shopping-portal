let connection = require("./connection");
module.exports = (keyword, options, callback) => {
	let parameters = [
		options.count || 0,
		options.count || 0,
		options.lprice,
		options.rprice
	];
	let constraint = ` and prod_price
		between ? and ?`;
	if (!(options.lprice && options.rprice)) {
		constraint = "";
		parameters.length -= 2;
	}
	connection.query(
		`Select * from Products P where prod_name like '%${keyword}%' 
			and ((select P.prod_count - sum(O.count) from Orders O where O.prod_id=P.prod_id) >= ?
			or(
				(select count(*) from Orders O where O.prod_id=P.prod_id) = 0
					and
				P.prod_count >= ?
			))
		` + constraint,
		parameters,
		callback
	);
};
