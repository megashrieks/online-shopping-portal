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
				!this.unmounted &&
					this.setState({
						items: cart.items
					});
			});
		}
		removeFromList = pid => () => {
			removeFromCart(pid);
		};
		sendInfo = pid => info => {
			let amt = 0;
			this.state.items.forEach(element => {
				if (element.pid === pid) amt += element.count * info.prod_price;
			});
			this.setState(prevState => ({
				totalamount: prevState.totalamount + amt
			}));
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
			// this.closeModal();
		};
		render() {
			console.log(this.state.items);
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
					<Switch>
						<Route
							path={this.props.match.url + "/buy"}
							component={() => (
								<Modal title="Buy Products? ">
									<div className="centered-container">
										<div className="centered-container">
											Are you sure you want to buy these{" "}
											{this.state.items.length} items ?
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
