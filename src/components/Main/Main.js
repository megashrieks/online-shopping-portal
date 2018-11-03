import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import TopBar from "../TopBar/TopBar";
import Purchases from "../Purchases/Purchases";
import Sell from "../Sell/Sell";
import axios from "axios";
export default withRouter(
	class Main extends Component {
		constructor(props) {
			super(props);
			axios.interceptors.response.use(config => {
				if (config.data.error && config.data.error === "login needed") {
					props.history.push(
						"/login?logout=0&rdr=" + window.location.pathname
					);
					config.error = null;
					return config;
				}
				return config;
			});
		}
		render() {
			return (
				<Fragment>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route
							path="/products/:pid"
							component={() => (
								<Fragment>
									<TopBar />
									<Product />
								</Fragment>
							)}
						/>
						<Route
							path="/purchases"
							component={() => (
								<Fragment>
									<TopBar />
									<Purchases />
								</Fragment>
							)}
						/>
						<Route
							path="/sell"
							component={() => (
								<Fragment>
									<TopBar />
									<Sell />
								</Fragment>
							)}
						/>
						<Route
							path="/"
							component={() => (
								<Fragment>
									<TopBar />
									<Dashboard />
								</Fragment>
							)}
						/>
					</Switch>
				</Fragment>
			);
		}
	}
);
