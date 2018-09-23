import React, { Component } from "react";
import "./Product.css";
export default class Product extends Component {
	state = {
		pdetail: {
			title: "King size water bed",
			details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
			price: 2500,
			stock: 7,
			rating: 4,
			pid: 1,
			image:
				"https://i.pinimg.com/originals/7f/89/db/7f89dbec476c069cc2d33ed94925ea05.jpg"
		}
	};
	render() {
		let detail = this.state.pdetail;
		return (
			<div className="product-details">
				<div className="image">
					<img src={detail.image} />
				</div>

				<div className="details">
					<div className="title">{detail.title}</div>
					<div className="item-details">{detail.details}</div>
					<div className="item-price">
						Price : {detail.price} <i className="fa fa-rupee" />
					</div>
					<div className="rating">
						Ratings : {detail.rating} / 5.0
					</div>
					<div className="buttons">
						<div
							className="btn btn-warn margin no-radius no-space auto-caps no-padd"
							style={{
								width: "150px"
							}}
						>
							<div className="icon">
								<i
									className="fa fa-cart-plus"
									style={{
										fontSize: "20px"
									}}
								/>{" "}
							</div>
							Add to cart
						</div>
						<div
							className="btn btn-submit margin no-radius no-space auto-caps no-padd"
							style={{
								width: "150px"
							}}
						>
							<div className="icon">
								<i
									className="fa fa-credit-card"
									style={{
										fontSize: "20px"
									}}
								/>{" "}
							</div>
							Buy now
						</div>
					</div>
				</div>
			</div>
		);
	}
}
