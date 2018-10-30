import React, { Component } from "react";
import "./TopBar.css";
export default class TopBar extends Component {
	state = {
		items: [],
		active: false
	};
	constructor(props) {
		super(props);
		let { subscribeCartEvent } = require("../utils/cart");
		subscribeCartEvent(this.changeCart);
	}
	changeCart = cart => {
		this.setState({
			items: cart.items
		});
	};
	componentDidMount() {
		let { getCart } = require("../utils/cart");
		this.setState({
			items: getCart().items
		});
	}
	toggleCartInfo = () => {
		this.setState(prevState => ({
			active: !prevState.active
		}));
	};
	render() {
		let cartList = this.state.items.map((element, index) => {
			return (
				<li className="cart-item" key={index}>
					{element.pid}:{element.count}
				</li>
			);
		});
		cartList.push(
			<li className="buy-prod btn btn-submit no-radius no-space no-padd">
				Place Order
			</li>
		);
		return (
			<div className="top-bar">
				<div
					className={
						"cart-detail" + (this.state.active ? " active" : "")
					}
				>
					<button
						onClick={this.toggleCartInfo}
						className="btn small no-radius block"
						style={{ width: "100px" }}
					>
						<div className="icon">
							<i className="fa fa-cart-plus" />
						</div>
						<span className="badge">{this.state.items.length}</span>
					</button>
					<div className="cart-content">{cartList}</div>
				</div>
			</div>
		);
	}
}