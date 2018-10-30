module.exports = trigger => {
	window.addEventListener("cartevent", e => {
		trigger(e.detail);
	});
};
