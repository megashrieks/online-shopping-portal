let connection = require("./connection");
module.exports = (username, password, callback) => {
	connection.query(
		`Select * from Customer where username=? and 
		password=?`,
		[username, password],
		callback
	);
};
