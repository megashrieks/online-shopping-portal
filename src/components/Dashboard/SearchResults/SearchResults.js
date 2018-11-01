import React, { Component } from "react";
import "./SearchResults.css";
import SearchItem from "./SearchItem/SearchItem";
import axios from "axios";
import Loading from "../../Loading/Loading";
let CancelToken = axios.CancelToken;
let source;
export default class SearchResults extends Component {
	componentWillUnmount() {
		source.cancel("Operation cancelled by the user");
	}
	componentDidUpdate(oldProps) {
		if (JSON.stringify(oldProps) !== JSON.stringify(this.props))
			this.sendSearch();
	}
	sendSearch = () => {
		source = CancelToken.source();
		this.setState({ loading: true });
		let pricerange = {};
		if (this.props.options.lprice !== null)
			pricerange = {
				lprice: this.props.options.lprice,
				rprice: this.props.options.rprice
			};
		axios
			.get("/search", {
				params: {
					q: this.props.keyword,
					...pricerange,
					quantity: this.props.options.quantity || 0
				},
				cancelToken: source.token
			})
			.then(response => {
				this.setState({
					loading: false,
					result: response.data.result.map(element => {
						return {
							title: element.prod_name,
							details: element.prod_details,
							price: element.prod_price,
							stock: element.remaining,
							rating: 4,
							pid: element.prod_id,
							image:
								"https://via.placeholder.com/200?text=image of " +
								element.prod_name.toLowerCase()
						};
					})
				});
			})
			.catch(err => {
				if (axios.isCancel(err)) console.log(err.message);
			});
	};
	componentDidMount() {
		this.sendSearch();
	}
	state = {
		result: [],
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
			<Loading loading={this.state.loading} conditional={true}>
				<div className="search-results">
					<div className="status-search">
						Showing search results for "{this.props.keyword}"
					</div>
					<div className="search-list">{list}</div>
				</div>
			</Loading>
		);
	}
}
