import React, { Component } from "react";
import "./Product.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Route, Switch, withRouter } from "react-router-dom";
import BuyModal from "./BuyModal/BuyModal";
import CartModal from "./CartModal/CartModal";
let CancelToken = axios.CancelToken;
let source;
export default withRouter(
	class Product extends Component {
		componentWillUnmount() {
			source.cancel("Operation cancelled by user");
		}
		cartitems = [];
		componentDidMount() {
			source = CancelToken.source();
			let { pid } = this.props.match.params;
			let { getCart } = require("../utils/cart");
			this.cartitems = getCart();
			for (let i = 0; i < this.cartitems.items.length; ++i) {
				if (this.cartitems.items[i].pid === pid) {
					this.setState({
						found: true
					});
					break;
				}
			}
			axios
				.get("/product/" + pid, {
					cancelToken: source.token
				})
				.then(response => {
					let {
						data: {
							prod_count: total,
							prod_details: details,
							prod_name: title,
							prod_price: price,
							remaining: stock
						}
					} = response;
					this.setState({
						pid,
						total,
						stock,
						details,
						title,
						price,
						loading: false
					});
				})
				.catch(err => {
					if (axios.isCancel(err)) console.log(err.message);
					else if (err.response.status === 404)
						this.props.history.push("/404");
				});
		}
		state = {
			pid: 0,
			stock: 0,
			details: "",
			title: "",
			price: 0,
			loading: true,
			rating: 4,
			image: "",
			found: false
		};
		gotobuy = () => {
			this.props.history.push(this.props.match.url + "/buy");
		};
		closeModal = () => {
			this.props.history.push(this.props.match.url);
		};
		gotocart = () => {
			this.props.history.push(this.props.match.url + "/cart");
		};
		removeItemFromCart = () => {
			let { removeFromCart } = require("../utils/cart");
			removeFromCart(this.state.pid);
			this.setState({
				found: false
			});
		};
		render() {
			let detail = this.state;
			return (
				<Loading conditional={true} loading={this.state.loading}>
					<div className="product-details">
						<div className="image">
							<img
								src={
									"https://via.placeholder.com/200?text=image of " +
									detail.title.toLowerCase()
								}
								alt={detail.title}
							/>
						</div>
						<div className="details">
							<div className="title">{detail.title}</div>
							<div className="item-details">{detail.details}</div>
							<div className="item-price">
								Price : {detail.price}{" "}
								<i className="fa fa-rupee-sign" />
							</div>
							<div className="item-remaining">
								Remaining {detail.stock} / {detail.total}
							</div>
							<div className="rating">
								Ratings : {detail.rating} / 5.0
							</div>
							<div className="buttons">
								{!this.state.found && (
									<div
										onClick={this.gotocart}
										className="btn margin no-radius no-space auto-caps no-padd"
										style={{ width: "150px" }}
									>
										<div className="icon">
											<i
												className="fa fa-cart-plus"
												style={{ fontSize: "20px" }}
											/>{" "}
										</div>
										Add to cart
									</div>
								)}
								{this.state.found && (
									<div
										onClick={this.removeItemFromCart}
										className="btn btn-danger margin no-radius no-space auto-caps"
										style={{ width: "200px" }}
									>
										<div className="icon">
											<i
												className="fa fa-cart-arrow-down"
												style={{ fontSize: "18px" }}
											/>{" "}
										</div>
										Remove from cart
									</div>
								)}
								<div
									onClick={this.gotobuy}
									className="btn btn-submit margin no-radius no-space auto-caps no-padd"
									style={{ width: "150px" }}
								>
									<div className="icon">
										<i
											className="fa fa-credit-card"
											style={{ fontSize: "20px" }}
										/>{" "}
									</div>
									Buy now
								</div>
							</div>
						</div>
					</div>
					<Switch>
						<Route
							path={this.props.match.url + "/buy"}
							component={() => (
								<BuyModal
									closeBuy={this.closeModal}
									item={{
										pid: this.state.pid,
										stock: this.state.stock,
										total: this.state.total
									}}
								/>
							)}
						/>
						{!this.state.found && (
							<Route
								path={this.props.match.url + "/cart"}
								component={() => (
									<CartModal
										closeCart={this.closeModal}
										item={{
											pid: this.state.pid,
											stock: this.state.stock,
											total: this.state.total
										}}
									/>
								)}
							/>
						)}
					</Switch>
				</Loading>
			);
		}
	}
);
