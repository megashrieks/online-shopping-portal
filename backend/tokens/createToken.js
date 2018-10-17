let jwt = require("jsonwebtoken");
let { key } = require("../../secret");

module.exports = object => {
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
			data: {
				...object
			}
		},
		key
	);
};
