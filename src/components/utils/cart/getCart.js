module.exports = () => {
	let cart = localStorage.getItem("cart");
	if (cart) return JSON.parse(cart);
	else
		return {
			items: []
		};
};
