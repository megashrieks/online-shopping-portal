import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
export default class Main extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path="/login" component={Login} />
				</Switch>
			</Fragment>
		);
	}
}
