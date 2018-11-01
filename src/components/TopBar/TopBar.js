import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
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
	unmounted = false;
	componentWillUnmount() {
		this.unmounted = true;
	}
	changeCart = cart => {
		!this.unmounted &&
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
				<CartItem pid={element.pid} count={element.count} key={index} />
			);
		});
		cartList.push(
			<li
				key={"place"}
				className="buy-prod block btn btn-submit no-radius no-space no-padd"
			>
				Manage Orders
			</li>
		);
		return (
			<div className="top-bar">
				<Link
					exact
					active="active-link"
					to="/"
					className="option purchases white no-shadow btn no-radius small block"
				>
					<i className="fa fa-home" />
				</Link>
				<div
					className={
						"cart-detail" + (this.state.active ? " active" : "")
					}
				>
					<button
						onClick={this.toggleCartInfo}
						className="btn toggle-cart white no-shadow small no-radius block"
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
					className="option purchases white no-shadow btn no-radius small block"
				>
					<i className="fa fa-box-open" />
				</Link>
				<Link
					active="active-link"
					to="/sell"
					className="option purchases white no-shadow btn no-radius small block"
				>
					<i className="fa fa-plus" />
				</Link>
			</div>
		);
	}
}
