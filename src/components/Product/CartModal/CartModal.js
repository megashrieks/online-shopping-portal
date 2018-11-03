import React, { Component } from "react";
import Modal from "../../UIUtils/Modal/Modal";

import InputField from "../../InputField/InputField";
export default class CartModal extends Component {
	state = {
		count: 0
	};
	addCart = count => () => {
		if (count > 0 && count <= this.props.item.stock) {
			let { addToCart } = require("../../utils/cart");
			addToCart(this.props.item.pid, count);
			this.props.closeCart();
		} else
			this.setState({
				invalidcount: true
			});
	};
	changeCount = ({ target: { value } }) => {
		this.setState({
			count: value
		});
	};
	render() {
		return (
			<Modal title={"Add to Cart"}>
				<div
					className="centered-container container"
					style={{ width: "350px" }}
				>
					<div className="amount">
						<InputField
							type="number"
							label="quantity"
							error={this.state.invalidcount}
							message={
								"value not between 1 and " +
								this.props.item.stock
							}
							displayMessage={this.state.invalidcount}
							value={this.state.count}
							onChange={this.changeCount}
						/>
					</div>
					<button
						className="btn btn-submit vsmall small-radius margin"
						onClick={this.addCart(this.state.count)}
					>
						Buy
					</button>
					<button
						className="btn btn-danger vsmall small-radius margin"
						onClick={this.props.closeCart}
					>
						Cancel
					</button>
				</div>
			</Modal>
		);
	}
}
