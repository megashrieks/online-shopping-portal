let mysql = require("mysql");
let conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "online_shopping_portal"
});
module.exports = conn;
