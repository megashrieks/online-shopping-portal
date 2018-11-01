import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
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
			<li
				key={"place"}
				className="buy-prod block btn btn-submit no-radius no-space no-padd"
			>
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
						className="btn white no-shadow small no-radius block"
						style={{ width: "100px" }}
					>
						<div className="icon">
							<i className="fa fa-cart-plus" />
						</div>
						<div className="badge">{this.state.items.length}</div>
					</button>
					<div className="cart-content">{cartList}</div>
				</div>
				<Link
					active="active-link"
					to="/purchases"
					className="purchases white no-shadow btn no-radius small block"
				>
					<i className="fa fa-box-open" />
				</Link>
				<Link
					active="active-link"
					to="/sell"
					className="purchases white no-shadow btn no-radius small block"
				>
					<i className="fa fa-plus" />
				</Link>
			</div>
		);
	}
}
