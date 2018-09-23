import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
export default class Main extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" component={Dashboard} />
				</Switch>
			</Fragment>
		);
	}
}
