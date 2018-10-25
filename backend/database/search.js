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
		`Select *,P.prod_count-
			(select coalesce(sum(O.count),0) from Orders O where O.prod_id=P.prod_id)
			as remaining from Products P where P.prod_name like
			'%${keyword}%' group by P.prod_id having remaining >= ?
		` + constraint,
		parameters,
		callback
	);
};
