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
		username: "shrikanth",
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
		return true;
	};
	validateSymbols = val => {
		return true;
	};
	validate = () => {
		let invalidusername = this.validateSymbols(this.state.username);
		let invalidemail = this.validateemail(this.state.email);
		return !this.state.invalid;
	};
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("operation cancelled by user");
	}
	register = () => {
		if (this.validate()) {
			this.setState({
				loading: true
			});
			source = CancelToken.source();
			axios
				.post(
					"/register",
					{
						username: this.state.username,
						password: this.state.password
					},
					{
						cancelToken: source.token
					}
				)
				.then(data => {
					if (data.data.error != null)
						this.setState({
							invalid: true,
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
								message={"invalid username or password"}
								displayMessage={this.state.invalid}
							/>
							<InputField
								onChange={this.changeData("email")}
								label="email"
								value={this.state.email}
								error={this.state.invalidemail}
								message={"invalid email format"}
								displayMessage={this.state.invalid}
							/>
							<InputField
								onChange={this.changeData("password")}
								label="password"
								value={this.state.password}
								type="password"
								error={this.state.invalidpassword}
							/>
							<InputField
								textarea={true}
								onChange={this.changeData("detail")}
								label="username"
								value={this.state.detail}
								error={this.state.invaliddetail}
								message={"invalid detail"}
								displayMessage={this.state.invaliddetail}
							/>
							<button
								className="btn btn-submit right"
								onClick={this.login}
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
