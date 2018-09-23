import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
export default class Main extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/products/:pid" component={Product} />
					<Route path="/" component={Dashboard} />
				</Switch>
			</Fragment>
		);
	}
}
