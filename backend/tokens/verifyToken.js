let jwt = require("jsonwebtoken");
let { key } = require("../../secret");
module.exports = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, key, (err, decoded) => {
			if (err) reject(err);
			else resolve(decoded);
		});
	});
};
