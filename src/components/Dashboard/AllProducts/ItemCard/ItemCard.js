import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";
export default ({ item }) => {
	let stars = [];
	let rating = ~~(Math.random() * 6);
	for (let i = 0; i < 5; ++i) {
		if (i < rating) stars.push(<i className="fa fa-star full" key={i} />);
		else stars.push(<i className="fa fa-star empty" key={i} />);
	}
	return (
		<Link className="item-card" to={"/products/" + item.pid}>
			<div className="product-image">
				<img src={item.image} alt={item.title} />
			</div>
			<div className="product-info">{item.details}</div>
			<div className="product-detail">
				<div className="product-title">{item.title}</div>
				<div className="half">
					{item.price} <i className="fa fa-rupee-sign" />
				</div>
				<div className="half">{stars}</div>
			</div>
		</Link>
	);
};
