import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import TopBar from "../TopBar/TopBar";
import Purchases from "../Purchases/Purchases";
import Sell from "../Sell/Sell";
export default class Main extends Component {
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
