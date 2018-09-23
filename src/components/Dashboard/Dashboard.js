import React, { Component } from "react";
import SearchComponent from "./SearchComponent/SearchComponent";
import SearchResults from "./SearchResults/SearchResults";
export default class Dashboard extends Component {
	state = {
		search: "",
		showResults: false
	};
	search = obj => {
		this.setState({
			search: obj.value,
			showResults: true
		});
	};
	render() {
		return (
			<div className="dashboard-component">
				<SearchComponent onSearch={this.search} />
				{this.state.showResults && (
					<SearchResults keyword={this.state.search} />
				)}
			</div>
		);
	}
}
