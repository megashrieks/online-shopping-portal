module.exports = (pid, count) => {
	let getCart = require("./getCart");
	let cart = getCart();
	cart.items.push({
		pid,
		count
	});
	localStorage.setItem("cart", JSON.stringify(cart));
	let emitCartChange = require("./emitCartChange");
	emitCartChange();
};
