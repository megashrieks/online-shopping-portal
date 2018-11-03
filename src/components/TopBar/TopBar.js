import React, { Component, Fragment } from "react";
import { NavLink as Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import "./TopBar.css";
import axios from "axios";
let CancelToken = axios.CancelToken;
let source;
export default class TopBar extends Component {
	state = {
		items: [],
		active: false,
		loggedIn: false
	};
	constructor(props) {
		super(props);
		let { subscribeCartEvent } = require("../utils/cart");
		subscribeCartEvent(this.changeCart);
	}
	unmounted = false;
	componentWillUnmount() {
		source.cancel("Operation cancelled by the user.");
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
		source = CancelToken.source();
		axios
			.post(
				"/validate",
				{},
				{
					cancelToken: source.token
				}
			)
			.then(response => {
				if (response.data.error)
					this.setState({
						loggedIn: false
					});
				else
					this.setState({
						loggedIn: true
					});
			})
			.catch(err => {
				if (axios.isCancel(err)) console.log(err.message);
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
						className="btn no-space toggle-cart white no-shadow small no-radius block"
						style={{ width: "100px" }}
					>
						<div className="icon">
							<i className="fa fa-cart-plus" />
						</div>
						<div className="badge">{this.state.items.length}</div>
					</button>
					<div className="cart-content">{cartList}</div>
				</div>
				<div className="right-float">
					{this.state.loggedIn && (
						<Fragment>
							<Link
								active="active-link"
								to="/purchases"
								className="option no-space purchases white no-shadow btn no-radius small block"
							>
								<i className="fa fa-box-open" />
							</Link>
							<Link
								active="active-link"
								to="/sell"
								className="option no-space purchases white no-shadow btn no-radius small block"
							>
								<i className="fa fa-plus" />
							</Link>
							<Link
								replace={true}
								active="active-link"
								to="/login?logout=1&rdr=/"
								className="option no-space purchases white no-shadow btn no-radius small block"
							>
								<i className="fa fa-sign-out-alt" />
							</Link>
						</Fragment>
					)}
					{!this.state.loggedIn && (
						<Fragment>
							<Link
								active="active-link"
								to="/register"
								className="option no-space purchases white no-shadow btn no-radius small block"
							>
								<i className="fa fa-user-plus" />
							</Link>
							<Link
								active="active-link"
								to="/login"
								className="option no-space purchases white no-shadow btn no-radius small block"
							>
								<i className="fa fa-sign-in-alt" />
							</Link>
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}
