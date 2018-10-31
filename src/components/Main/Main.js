import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import TopBar from "../TopBar/TopBar";
import Purchases from "../Purchases/Purchases";
export default class Main extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/login" component={Login} />
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
