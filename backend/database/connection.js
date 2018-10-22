let mysql = require("mysql");
let { username, password } = require("../../secret");
let conn = mysql.createConnection({
	host: "localhost",
	user: username,
	password: password,
	database: "online_shopping_portal"
});
module.exports = conn;
