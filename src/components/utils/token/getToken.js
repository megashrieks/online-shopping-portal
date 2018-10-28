module.exports = () => {
	let token = localStorage.getItem("auth");
	if (token) return token;
	else return "";
};
