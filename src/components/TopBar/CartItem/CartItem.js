import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import "./CartItem.css";
import axios from "axios";
let CancelToken = axios.CancelToken;
let source;
export default class CartItem extends Component {
	state = {
		loading: true,
		image: "",
		title: "",
		detail: "",
		remaining: 0
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	componentDidMount() {
		source = CancelToken.source();
		axios
			.get("/product/" + this.props.pid, {
				cancelToken: source.token
			})
			.then(response => {
				if (response.data.error)
					this.setState({
						loading: false,
						error: true
					});
				else
					this.setState({
						loading: false,
						title: response.data.prod_name,
						detail: response.data.prod_details,
						remaining: response.data.remaining,
						image:
							"https://via.placeholder.com/200?text=image of " +
							response.data.prod_name.toLowerCase()
					});
			})
			.catch(err => {
				if (axios.isCancel(err)) console.log(err.message);
			});
	}
	render() {
		return (
			<Link className="cart-item" to={"/products/" + this.props.pid}>
				<Loading loading={this.state.loading} conditional={true}>
					<div className="cart-image">
						<img src={this.state.image} alt={this.state.title} />
					</div>
					<div className="cart-details">
						<div className="cart-title">{this.state.title}</div>
						<div className="cart-info">{this.state.detail}</div>
					</div>
					<div className="cart-count">
						{this.props.count <= this.state.remaining ? (
							this.props.count
						) : (
							<i className="fa fa-ban" />
						)}
					</div>
				</Loading>
			</Link>
		);
	}
}
