import React, { Component, Fragment } from "react";
import Modal from "../../UIUtils/Modal/Modal";
import axios from "axios";
import Loading from "../../Loading/Loading";
import InputField from "../../InputField/InputField";
let CancelToken = axios.CancelToken;
let source;
export default class BuyModal extends Component {
	state = {
		amount: 1,
		loading: false,
		success: false,
		invalidqty: false
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	componentDidMount() {
		source = CancelToken.source();
	}
	changeAmount = ({ target: { value } }) => {
		this.setState({ amount: value });
	};
	validate = amt => {
		return amt > 0 && amt <= this.props.item.stock;
	};
	buy = amount => () => {
		if (!this.validate(amount)) {
			this.setState({
				invalidqty: true
			});
			return;
		}
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
				if (!response.data.error) {
					this.setState({
						loading: false,
						success: true
					});
				}
			})
			.catch(err => {
				if (axios.isCancel(err)) console.log(err.message);
			});
	};
	render() {
		return (
			<Fragment>
				<Modal title={"Buy Now"}>
					<div
						className="centered-container container"
						style={{
							width: "350px"
						}}
					>
						<Loading loading={this.state.loading}>
							<div className="amount">
								<InputField
									type="number"
									label="quantity"
									error={this.state.invalidqty}
									message={
										"value not between 1 and " +
										this.props.item.stock
									}
									displayMessage={this.state.invalidqty}
									value={this.state.amount}
									onChange={this.changeAmount}
								/>
							</div>
							<button
								className="btn btn-submit vsmall small-radius margin"
								onClick={this.buy(this.state.amount)}
							>
								Buy
							</button>
							<button
								className="btn btn-danger vsmall small-radius margin"
								onClick={this.props.closeBuy}
							>
								Cancel
							</button>
						</Loading>
					</div>
				</Modal>
				{this.state.success && (
					<Modal title={"Successful"}>
						<div className="centered-container">
							<div className="vertical-padding b-font">
								Congratulations On Buying the product
							</div>
							<div>
								<button
									className="btn btn-danger vsmall no-radius margin"
									onClick={this.props.closeBuy}
								>
									Close
								</button>
							</div>
						</div>
					</Modal>
				)}
			</Fragment>
		);
	}
}
