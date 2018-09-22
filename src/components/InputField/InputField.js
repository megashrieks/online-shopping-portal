import React, { Component } from "react";
import "./InputField.css";
export default class InputField extends Component {
	render() {
		return (
			<label className="input-field">
				<input
					className="input-raw"
					value={this.props.value}
					onChange={this.props.onChange}
					type={this.props.type || "text"}
				/>
				<div className="actual-label">{this.props.label}</div>
			</label>
		);
	}
}
