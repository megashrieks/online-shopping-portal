import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import axios from "axios";
import ItemCard from "./ItemCard/ItemCard";
let CancelToken = axios.CancelToken;
let source;
export default class AllProducts extends Component {
	state = {
		items: [],
		loading: true
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	componentDidMount() {
		source = CancelToken.source();
		axios
			.get("/search", {
				params: {
					q: "",
					quantity: 1
				},
				cancelToken: source.token
			})
			.then(response => {
				this.setState({
					loading: false,
					items: response.data.result.map(element => {
						return {
							title: element.prod_name,
							details: element.prod_details,
							price: element.prod_price,
							stock: element.remaining,
							rating: 4,
							pid: element.prod_id,
							image: element.image
						};
					})
				});
			});
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="">
					{this.state.items.map((element, index) => {
						return (
							<ItemCard
								item={element}
								key={element.title + index}
							/>
						);
					})}
				</div>
			</Loading>
		);
	}
}
