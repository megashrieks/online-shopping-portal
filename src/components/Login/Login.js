import React, { Component } from "react";
import "./Login.css";
import InputField from "../InputField/InputField";
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
						<button className="btn btn-submit right">Submit</button>
					</div>
				</div>
			</div>
		);
	}
}
