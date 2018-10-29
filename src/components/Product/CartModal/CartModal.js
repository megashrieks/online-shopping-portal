import React, { Component } from "react";
import Modal from "../../UIUtils/Modal/Modal";

export default class CartModal extends Component {
	state = {
		count: 0
	};
	addCart = count => () => {
		let { addToCart } = require("../../utils/cart");
		addToCart(this.props.item.pid, count);
		this.props.closeCart();
	};
	changeCount = ({ target: { value } }) => {
		this.setState({
			count: value
		});
	};
	render() {
		return (
			<Modal title={"Add to Cart"}>
				<div className="amount">
					<input
						type="number"
						value={this.state.count}
						onChange={this.changeCount}
					/>
				</div>
				<button onClick={this.addCart(this.state.count)}>Buy</button>
				<button onClick={this.props.closeCart}>Cancel</button>
			</Modal>
		);
	}
}
