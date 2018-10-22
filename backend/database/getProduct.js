let connection = require("./connection");

module.exports = (prod_id, callback) => {
	connection.query(
		`
		Select *,P.prod_count-(select count(*) from Orders O where O.prod_id=P.prod_id) as remaining from Products P where prod_id = ?
	`,
		prod_id,
		callback
	);
};
