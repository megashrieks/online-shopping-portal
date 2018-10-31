let connection = require("./connection");
module.exports = (username, callback) => {
	connection.query(
		`Select P.prod_id,P.prod_name,O.count
	from Products P,Orders O
	where O.prod_id = P.prod_id and O.cust_id=?`,
		username,
		callback
	);
};
