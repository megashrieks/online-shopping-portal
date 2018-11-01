let connection = require("./connection");

module.exports = (details, callback) => {
	let { pid, username, count } = details;
	connection.query(
		`
		insert into Orders values (?,?,?)
		`,
		[pid, username, count],
		callback
	);
};
