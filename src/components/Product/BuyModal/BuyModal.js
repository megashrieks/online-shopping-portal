import React, { Component } from "react";
import Modal from "../../UIUtils/Modal/Modal";
import axios from "axios";
import Loading from "../../Loading/Loading";
let CancelToken = axios.CancelToken;
let source;
export default class BuyModal extends Component {
	state = { amount: 1, loading: false };
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	changeAmount = ({ target: { value } }) => {
		this.setState({ amount: value });
	};
	buy = amount => () => {
		source = CancelToken.source();
		this.setState({ loading: true });
		axios
			.post(
				"/buy/" + this.props.item.pid,
				{ count: amount },
				{
					cancelToken: source.token
				}
			)
			.then(response => {
				if (!response.data.error) alert("buying successful");
				else alert("buying failed");
				this.setState({ loading: false });
				this.props.closeBuy();
			});
	};
	render() {
		return (
			<Modal title={"Buy Now"}>
				<Loading loading={this.state.loading}>
					<div className="amount">
						<input
							type="number"
							value={this.state.amount}
							onChange={this.changeAmount}
						/>
					</div>
					<button onClick={this.buy(this.state.amount)}>Buy</button>
					<button onClick={this.props.closeBuy}>Cancel</button>
				</Loading>
			</Modal>
		);
	}
}
