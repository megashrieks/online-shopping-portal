import React, { Component } from "react";
import CartItem from "../../TopBar/CartItem/CartItem";
import "./CartListItem.css";
export default class CartListItem extends Component {
	render() {
		return (
			<div className="cart-list-item">
				<div className="wid-75">
					<CartItem
						sendInfo={this.props.sendInfo(this.props.pid)}
						pid={this.props.pid}
						count={this.props.count}
					/>
				</div>
				<div
					className="delete-icon"
					onClick={this.props.removeFromList}
				>
					<i className="fa fa-trash" />
				</div>
			</div>
		);
	}
}
