import React, { Component } from "react";
import "./Register.css";
import InputField from "../InputField/InputField";
import axios from "axios";
import Loading from "../Loading/Loading";
import setToken from "../utils/token/setToken";
let CancelToken = axios.CancelToken;
let source;
export default class Register extends Component {
	state = {
		username: "",
		password: "",
		email: "",
		detail: "",
		invalid: false,
		invalidusername: false,
		invalidpassword: false,
		invalidemail: false,
		invaliddetail: false,
		loading: false
	};
	changeData = field => ({ target: { value } }) => {
		this.setState({
			[field]: value,
			["invalid" + field]: false
		});
	};
	validateemail = val => {
		return !val.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g);
	};
	validateSymbols = val => {
		return false;
	};
	validate = () => {
		let invalidusername =
			this.validateSymbols(this.state.username) ||
			this.state.username.replace(/ /g, "").length === 0;
		let invalidemail = this.validateemail(this.state.email);
		let invalidpassword = this.state.password.length === 0;
		if (invalidusername)
			this.setState({
				invalidusername: true,
				usernamemsg: "username invalid"
			});
		if (invalidemail) this.setState({ invalidemail: true });
		if (invalidpassword) this.setState({ invalidpassword: true });
		return invalidusername || invalidemail || invalidpassword;
	};
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("operation cancelled by user");
	}
	register = () => {
		if (!this.validate()) {
			this.setState({
				loading: true
			});
			source = CancelToken.source();
			console.log("happening");
			axios
				.post(
					"/register",
					{
						username: this.state.username,
						password: this.state.password,
						email: this.state.email,
						details: this.state.details
					},
					{
						cancelToken: source.token
					}
				)
				.then(data => {
					console.log(data);
					if (data.data.error != null)
						this.setState({
							invalidusername: true,
							usernamemsg: data.data.error,
							loading: false
						});
					else {
						this.setState({
							loading: false
						});
						setToken(data.data.token);
						this.props.history.push("/");
					}
				})
				.catch(thrown => {
					console.log(thrown);
				});
		}
	};
	render() {
		return (
			<div className="Register">
				<div className="carousel-component">Carousel here</div>
				<div className="register-form">
					<Loading loading={this.state.loading}>
						<div className="header-3">Register to continue...</div>
						<div className="register-inputs">
							<InputField
								onChange={this.changeData("username")}
								label="username"
								value={this.state.username}
								error={this.state.invalidusername}
								message={this.state.usernamemsg}
								displayMessage={this.state.invalidusername}
							/>
							<InputField
								onChange={this.changeData("email")}
								label="email"
								value={this.state.email}
								error={this.state.invalidemail}
								message={"invalid email format"}
								displayMessage={this.state.invalidemail}
							/>
							<InputField
								onChange={this.changeData("password")}
								label="password"
								value={this.state.password}
								type="password"
								error={this.state.invalidpassword}
								message={"invalid password"}
								displayMessage={this.state.invalidpassword}
							/>
							<InputField
								textarea={true}
								onChange={this.changeData("detail")}
								label="About you"
								value={this.state.detail}
								error={this.state.invaliddetail}
								message={"invalid detail"}
								displayMessage={this.state.invaliddetail}
							/>
							<button
								className="btn btn-submit right"
								onClick={this.register}
							>
								Submit
							</button>
						</div>
					</Loading>
				</div>
			</div>
		);
	}
}
