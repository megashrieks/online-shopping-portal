import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { getCart, removeFromCart, subscribeCartEvent } from "../utils/cart";
import CartListItem from "./CartListItem/CartListItem";
import Modal from "../UIUtils/Modal/Modal";
import axios from "axios";
let CancelToken = axios.CancelToken;
let source;
export default withRouter(
	class Manage extends Component {
		unmounted = false;
		state = {
			items: [],
			totalamount: 0
		};
		banned = {};
		info = [];
		initial = true;
		componentWillUnmount() {
			this.unmounted = true;
			source.cancel("Operation cancelled by the user");
		}
		componentDidMount() {
			source = CancelToken.source();
			this.setState({
				items: getCart().items
			});
			subscribeCartEvent(cart => {
				this.initial = false;
				let keys = Object.keys(this.banned);
				let tempinfo = [];
				let amt = 0;
				for (var i = 0; i < keys.length; ++i) {
					let found = false;
					cart.items.forEach(element => {
						if (element.pid === keys[i]) found = true;
					});
					if (!found) delete this.banned[keys[i]];
				}
				let t = this.count(cart.items);
				amt = t[0];
				this.info = t[1];
				!this.unmounted &&
					this.setState({
						items: cart.items,
						totalamount: amt
					});
			});
		}
		count = items => {
			let amt = 0;
			let tempinfo = [];
			items.forEach(element => {
				this.info.forEach(inelement => {
					if (inelement.prod_id == element.pid) {
						tempinfo.push(inelement);
						if (element.count <= inelement.remaining) {
							amt += element.count * inelement.prod_price;
						}
					}
				});
			});
			return [amt, tempinfo];
		};
		removeFromList = pid => () => {
			removeFromCart(pid);
		};
		sendInfo = pid => info => {
			let amt = 0;
			this.info.push(info);
			this.initial &&
				this.setState({
					totalamount: this.count(this.state.items)[0]
				});
		};
		gotobuy = () => {
			this.props.history.push(this.props.match.url + "/buy");
		};
		closeModal = () => {
			this.props.history.push(this.props.match.url);
		};
		itemcount = 0;
		buy = () => {
			this.itemcount = this.state.items.length;
			source = CancelToken.source();
			this.setState({
				items: this.state.items.map(element => {
					element.status = "Pending";
					return element;
				})
			});
			this.state.items.forEach((element, index) => {
				if (this.banned[element.pid]) {
					this.itemcount -= 1;
					return;
				}
				axios
					.post(
						"/buy/" + element.pid,
						{ count: element.count },
						{
							cancelToken: source.token
						}
					)
					.then(response => {
						this.itemcount -= 1;
						if (!response.data.error) {
							removeFromCart(element.pid);
						}
						if (this.itemcount === 0) this.closeModal();
					})
					.catch(err => {
						this.itemcount -= 1;
						if (axios.isCancel(err)) console.log(err.message);
						if (this.itemcount === 0) this.closeModal();
					});
			});
		};
		render() {
			let list = this.state.items.map((element, index) => {
				return (
					<CartListItem
						pid={element.pid}
						count={element.count}
						key={index}
						removeFromList={this.removeFromList(element.pid)}
						sendInfo={this.sendInfo}
					/>
				);
			});
			return (
				<div className="container">
					<div className="header">My Cart</div>
					<div
						style={{
							padding: "10px 0"
						}}
					>
						{list}
					</div>
					{this.state.items.length - Object.keys(this.banned).length >
						0 && (
						<div className="total">
							<div className="half">
								<center>
									Total Price : {this.state.totalamount}
								</center>
							</div>
							<div className="half">
								<center>
									<div
										onClick={this.gotobuy}
										className="btn btn-submit margin vsmall"
									>
										Buy All
									</div>
								</center>
							</div>
						</div>
					)}
					<Switch>
						<Route
							path={this.props.match.url + "/buy"}
							component={() => (
								<Modal title="Buy Products? ">
									<div className="centered-container">
										<div className="centered-container">
											Are you sure you want to buy these{" "}
											{this.state.items.length -
												Object.keys(this.banned)
													.length}{" "}
											items ?
										</div>
									</div>
									<center>
										<button
											onClick={this.buy}
											className="btn margin btn-submit vsmall"
										>
											Yes
										</button>
										<button
											onClick={this.closeModal}
											className="btn margin btn-danger vsmall"
										>
											No
										</button>
									</center>
								</Modal>
							)}
						/>
					</Switch>
				</div>
			);
		}
	}
);
