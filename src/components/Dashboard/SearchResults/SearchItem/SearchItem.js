import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchItem.css";
export default class SearchItem extends Component {
	render() {
		let stars = [];
		let rating = ~~(Math.random() * 6);
		for (let i = 0; i < 5; ++i) {
			if (i < rating)
				stars.push(<i className="fa fa-star full" key={i} />);
			else stars.push(<i className="fa fa-star empty" key={i} />);
		}
		let item = this.props.item;
		return (
			<Link className="search-item" to={"/products/" + item.pid}>
				<div className="image">
					<img src={item.image} alt={"image of " + item.title} />
				</div>
				<div className="details">
					<div className="title">{item.title}</div>
					<div className="item-details">{item.details}</div>
					<div className="item-price">
						Price : {item.price} <i className="fa fa-rupee-sign" />
					</div>
					<div className="rating">{stars}</div>
				</div>
			</Link>
		);
	}
}
