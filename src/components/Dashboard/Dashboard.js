import React, { Component } from "react";
import SearchComponent from "./SearchComponent/SearchComponent";
import SearchResults from "./SearchResults/SearchResults";
import AllProducts from "./AllProducts/AllProducts";
export default class Dashboard extends Component {
	state = {
		search: "",
		controls: {},
		showResults: false
	};
	search = obj => {
		this.setState({
			controls: obj.controls,
			search: obj.value,
			showResults: true
		});
	};
	render() {
		return (
			<div className="dashboard-component">
				<SearchComponent onSearch={this.search} />
				{this.state.showResults && (
					<SearchResults
						keyword={this.state.search}
						controls={this.state.controls}
					/>
				)}
				{!this.state.showResults && <AllProducts />}
			</div>
		);
	}
}
