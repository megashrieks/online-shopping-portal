let connection = require("./connection");

module.exports = (details, callback) => {
	connection.query(
		`
		insert into Customer(username,password,email,details) values(
			?,
			?,
			?,
			?
		)
	`,
		[details.username, details.password, details.email, details.details],
		callback
	);
};
