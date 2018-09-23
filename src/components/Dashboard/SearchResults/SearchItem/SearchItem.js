import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchItem.css";
export default class SearchItem extends Component {
	render() {
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
						Price : {item.price} <i className="fa fa-rupee" />
					</div>
					<div className="rating">Ratings : {item.rating} / 5.0</div>
				</div>
			</Link>
		);
	}
}
