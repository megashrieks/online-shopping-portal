import React, { Component } from "react";
import Loading from "../Loading/Loading";
import { withRouter } from "react-router-dom";
import "./Sell.css";
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
			nameerror: false,
			priceerror: false,
			counterror: false,
			detailserror: false
		};
		change = field => ({ target: { value } }) => {
			this.setState({
				[field]: value,
				[field + "error"]: false
			});
		};
		submit = () => {
			let nameerror = this.state.name.replace(/\s/g, "") === "";
			let priceerror = this.state.price === "";
			let counterror = this.state.count === "";
			let detailserror = this.state.details.replace(/\s/g, "") === "";
			this.setState({
				nameerror,
				priceerror,
				counterror,
				detailserror
			});
			if (nameerror || priceerror || counterror || detailserror) return;
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
							details: this.state.details
						},
						{
							cancelToken: source.token
						}
					)
					.then(response => {
						this.setState({
							loading: false
						});
						if (response.data.error) console.log(response.data.err);
						else {
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
							<div className="file-centered">
								<form>
									<label className="custom-file" for="fileme">
										<div className="styled-upload">
											<span className="ocher">
												<h4>Upload Image..</h4>
											</span>
										</div>
										<input type="file" id="fileme" />
									</label>
								</form>
							</div>
						</div>
						<div
							className="container float form-container"
							style={{ width: "75%" }}
						>
							<div className="header">
								Enter your product information
							</div>
							<div
								className={
									"input-group" +
									(this.state.nameerror ? " error" : "")
								}
							>
								<div className="label inline">Name</div>
								<div className="input inline">
									<input
										type="text"
										value={this.state.name}
										onChange={this.change("name")}
									/>
								</div>
							</div>
							<div
								className={
									"input-group" +
									(this.state.priceerror ? " error" : "")
								}
							>
								<div className="label inline">Price</div>
								<div className="input inline">
									<input
										type="number"
										value={this.state.price}
										onChange={this.change("price")}
									/>
								</div>
							</div>
							<div
								className={
									"input-group" +
									(this.state.counterror ? " error" : "")
								}
							>
								<div className="label inline">Quantity</div>
								<div className="input inline">
									<input
										type="number"
										value={this.state.count}
										onChange={this.change("count")}
									/>
								</div>
							</div>
							<div
								className={
									"input-group" +
									(this.state.detailserror ? " error" : "")
								}
							>
								<div className="label inline">Details</div>
								<div className="input inline">
									<textarea
										rows={10}
										cols={60}
										value={this.state.details}
										onChange={this.change("details")}
									/>
								</div>
							</div>
							<button
								className="btn btn-submit small no-radius"
								style={{
									float: "right",
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
				</Loading>
			);
		}
	}
);
