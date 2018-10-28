import React, { Component } from "react";
import "./Modal.css";
export default class Modal extends Component {
	render() {
		return (
			<div className="modal-container">
				<div className="modal">
					<div className="modal-title">{this.props.title}</div>
					<div className="modal-content">{this.props.children}</div>
				</div>
			</div>
		);
	}
}
