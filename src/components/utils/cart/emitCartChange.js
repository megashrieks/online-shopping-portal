module.exports = () => {
	let getCart = require("./getCart");
	let cartEvent = new CustomEvent("cartevent", { detail: getCart() });
	window.dispatchEvent(cartEvent);
};
