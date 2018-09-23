import React, { Component } from "react";
import "./SearchResults.css";
import SearchItem from "./SearchItem/SearchItem";
export default class SearchResults extends Component {
	state = {
		result: [
			{
				title: "King size water bed",
				details: `King size water beds.
                 contains water inside water bed 2 ppl can fit inside, 
                 2 ppl can fit outside`,
				price: 2500,
				stock: 7,
				rating: 4,
				pid: 1,
				image:
					"https://i.pinimg.com/originals/7f/89/db/7f89dbec476c069cc2d33ed94925ea05.jpg"
			}
		],
		scrollset: 10,
		offset: 0
	};
	render() {
		let list = null;
		if (this.state.result.length === 0)
			if (this.props.keyword === "") list = "Enter a keyword to search";
			else list = "No result was found";
		else
			list = this.state.result.map((element, index) => {
				return <SearchItem item={element} key={"item-" + index} />;
			});
		return (
			<div className="search-results">
				<div className="status-search">
					Showing 1 of 1000 for search "{this.props.keyword}"
				</div>
				<div className="search-list">{list}</div>
			</div>
		);
	}
}
