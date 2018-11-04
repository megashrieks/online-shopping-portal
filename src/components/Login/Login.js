import React, { Component } from "react";
import "./Login.css";
import InputField from "../InputField/InputField";
import axios from "axios";
import Loading from "../Loading/Loading";
import setToken from "../utils/token/setToken";
import queryString from "query-string";
import { Link } from "react-router-dom";
let CancelToken = axios.CancelToken;
let source;
export default class Login extends Component {
	state = {
		username: "",
		password: "",
		invalid: false,
		loading: false
	};
	changeData = field => ({ target: { value } }) => {
		this.setState({
			[field]: value,
			invalid: false
		});
	};
	validate = () => {
		return !this.state.invalid;
	};
	componentDidMount() {
		let params = queryString.parse(this.props.location.search);
		if (params.logout * 1 && params.rdr) {
			localStorage.removeItem("auth");
			this.props.history.push(params.rdr);
		}
		source = CancelToken.source();
		localStorage.removeItem("auth");
	}
	componentWillUnmount() {
		source.cancel("operation cancelled by user");
	}
	login = () => {
		if (this.validate()) {
			this.setState({
				loading: true
			});
			source = CancelToken.source();
			axios
				.post(
					"http://localhost:5000/login",
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
						let params = queryString.parse(
							this.props.location.search
						);
						if (params.rdr) this.props.history.push(params.rdr);
						else this.props.history.push("/");
					}
				})
				.catch(thrown => {
					if (axios.isCancel(thrown)) console.log(thrown.message);
				});
		}
	};
	render() {
		return (
			<div className="Login">
				<div className="carousel-component">Carousel here</div>
				<div className="login-form">
					<Loading loading={this.state.loading}>
						<div className="header-3">login to continue...</div>
						<div className="login-inputs">
							<InputField
								onChange={this.changeData("username")}
								label="username"
								value={this.state.username}
								error={this.state.invalid}
								message={"invalid username or password"}
								displayMessage={this.state.invalid}
							/>
							<InputField
								onChange={this.changeData("password")}
								label="password"
								value={this.state.password}
								type="password"
								error={this.state.invalid}
							/>
							<div className="centered-container">
								Not a member ?{" "}
								<Link className="reg-link" to="/register">
									Sign up
								</Link>
							</div>
							<center>
								<button
									className="btn btn-submit"
									onClick={this.login}
								>
									Submit
								</button>
							</center>
						</div>
					</Loading>
				</div>
			</div>
		);
	}
}
