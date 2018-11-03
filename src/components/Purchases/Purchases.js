import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Purchases.css";
let CancelToken = axios.CancelToken;
let source;
export default class Purchases extends Component {
	state = {
		orders: []
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	componentDidMount() {
		source = CancelToken.source();
		axios
			.post(
				"/purchases",
				{},
				{
					cancelToken: source.token
				}
			)
			.then(response => {
				this.setState({
					orders: response.data.data || []
				});
			})
			.catch(err => {
				if (axios.isCancel(err)) console.log(err.message);
			});
	}
	render() {
		let list = this.state.orders.map((element, index) => {
			return (
				<Link
					className="order-link"
					to={"/products/" + element.prod_id}
					key={index}
				>
					<div className="order-item">
						<div className="half">{element.prod_name}</div>
						<div className="half">{element.count}</div>
					</div>
				</Link>
			);
		});
		list = [
			<div className="order-item" key={"header"}>
				<div className="half">Product Name</div>
				<div className="half">Order Count</div>
			</div>
		].concat(list);
		return (
			<div className="container">
				<div className="header">My Purchases</div>
				{list}
			</div>
		);
	}
}
