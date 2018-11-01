module.exports = pid => {
	let getCart = require("./getCart");
	let cart = getCart();
	let items = [];
	cart.items.forEach(element => {
		if (element.pid === pid) return;
		items.push(element);
	});
	let newcart = {
		items
	};
	localStorage.setItem("cart", JSON.stringify(newcart));
	let emitCartChange = require("./emitCartChange");
	emitCartChange();
};
