import React, { Component } from "react";
import Loading from "../Loading/Loading";
import { withRouter } from "react-router-dom";
import "./Sell.css";
import InputField from "../InputField/InputField";
import axios from "axios";
let CancelToken = axios.CancelToken;
let source;
export default withRouter(
	class Sell extends Component {
		componentWillUnmount() {
			if (source) source.cancel("Operation cancelled by the user");
		}
		state = {
			loading: false,
			name: "",
			price: 0,
			count: 0,
			details: "",
			image: "",
			nameerror: false,
			priceerror: false,
			counterror: false,
			detailserror: false,
			imageerror: false
		};
		change = field => ({ target: { value } }) => {
			this.setState({
				[field]: value,
				[field + "error"]: false
			});
		};
		submit = () => {
			let nameerror = this.state.name.replace(/\s/g, "") === "";
			let priceerror = this.state.price < 1;
			let counterror = this.state.count < 1;
			let detailserror = this.state.details.replace(/\s/g, "") === "";
			let imageerror =
				this.state.image.replace(/\s/g, "") === "" ||
				!this.state.image.match(
					/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
				);
			this.setState({
				nameerror,
				priceerror,
				counterror,
				detailserror,
				imageerror
			});
			if (
				nameerror ||
				priceerror ||
				counterror ||
				detailserror ||
				imageerror
			)
				return;
			else {
				this.setState({
					loading: true
				});
				source = CancelToken.source();
				axios
					.post(
						"/sell",
						{
							name: this.state.name,
							price: this.state.price,
							count: this.state.count,
							details: this.state.details,
							image: this.state.image
						},
						{
							cancelToken: source.token
						}
					)
					.then(response => {
						if (response.data.error) return;
						else {
							this.setState({
								loading: false
							});
							this.props.history.push(
								"/products/" + response.data.pid
							);
						}
					})
					.catch(err => {
						if (axios.isCancel(err)) console.log(err.message);
						this.setState({
							loading: false
						});
					});
			}
		};
		render() {
			return (
				<Loading loading={this.state.loading}>
					<div
						className="container"
						style={{ height: "calc(100vh - 50px)" }}
					>
						<div
							className="container float image-upload"
							style={{ width: "25%" }}
						>
							<div className="centered">
								<InputField
									type="text"
									label="Image url"
									error={this.state.imageerror}
									message={"invalid url"}
									displayMessage={this.state.imageerror}
									value={this.state.image}
									onChange={this.change("image")}
								/>
							</div>
						</div>
						<div
							className="container float form-container"
							style={{ width: "75%" }}
						>
							<div className="header">
								Enter your product information
							</div>
							<div>
								<div className="input-group half">
									<InputField
										type="text"
										label="Name"
										error={this.state.nameerror}
										message={"invalid name"}
										displayMessage={this.state.nameerror}
										value={this.state.name}
										onChange={this.change("name")}
									/>
								</div>
							</div>
							<div className="input-group half">
								<InputField
									type="number"
									label="Price"
									error={this.state.priceerror}
									message={"invalid price"}
									displayMessage={this.state.priceerror}
									value={this.state.price}
									onChange={this.change("price")}
								/>
							</div>
							<div className="input-group half">
								<InputField
									type="number"
									label="quantity"
									error={this.state.counterror}
									message={"invalid quantity"}
									displayMessage={this.state.counterror}
									value={this.state.count}
									onChange={this.change("count")}
								/>
							</div>
							<div className="input-group half">
								<InputField
									textarea={true}
									label="details"
									error={this.state.detailserror}
									message={"invalid details"}
									displayMessage={this.state.detailserror}
									value={this.state.details}
									onChange={this.change("details")}
								/>
							</div>
							<div className="half centered-container bbx">
								<button
									className="btn btn-submit vsmall small-radius"
									style={{
										width: "100px",
										height: "40px",
										lineHeight: "40px"
									}}
									onClick={this.submit}
								>
									Sell
								</button>
							</div>
						</div>
					</div>
				</Loading>
			);
		}
	}
);
