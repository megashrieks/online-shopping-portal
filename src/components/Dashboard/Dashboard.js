import React, { Component } from "react";
import SearchComponent from "./SearchComponent/SearchComponent";
import SearchResults from "./SearchResults/SearchResults";
import AllProducts from "./AllProducts/AllProducts";
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
					<SearchResults keyword={this.state.search} options={{}} />
				)}
				{!this.state.showResults && <AllProducts />}
			</div>
		);
	}
}
