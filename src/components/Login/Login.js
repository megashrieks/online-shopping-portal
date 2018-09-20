import React, { Component } from "react";
import "./Login.css";
import InputField from "../InputField/InputField";
import axios from "axios";
export default class Login extends Component {
	state = {
		username: "shrikanth",
		password: ""
	};
	changeData = field => ({ target: { value } }) => {
		this.setState({
			[field]: value
		});
	};
	validate = () => {
		return true;
	};
	login = () => {
		if (this.validate()) {
			axios
				.post("http://localhost:5000/login", {
					username: this.state.username,
					password: this.state.password
				})
				.then(data => {
					if (data.data.error != null)
						console.log("Login unsuccessful");
					else console.log("Successful");
				})
				.catch(thrown => {
					console.log(thrown);
				});
		}
	};
	render() {
		return (
			<div className="Login">
				<div className="carousel-component">Carousel here</div>
				<div className="login-form">
					<div className="header-3">
						Login to Access Unlimited Potential
					</div>
					<div className="login-inputs">
						<InputField
							onChange={this.changeData("username")}
							label="username"
							value={this.state.username}
						/>
						<InputField
							onChange={this.changeData("password")}
							label="password"
							value={this.state.password}
							type="password"
						/>
						<button
							className="btn btn-submit right"
							onClick={this.login}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}
