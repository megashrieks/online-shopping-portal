import React, { Component } from "react";
import "./SearchComponent.css";
export default class SearchComponent extends Component {
	state = {
		val: "",
		controls: false,
		controlValues: {}
	};
	changeVal = ({ target: { value } }) => {
		this.setState({
			val: value
		});
	};
	toggleControls = () => {
		this.setState(prevState => ({
			controls: !prevState.controls
		}));
	};
	search = () => {
		this.props.onSearch({
			value: this.state.val,
			controls: this.state.controlValues
		});
	};
	render() {
		return (
			<div
				className={
					"search-component" +
					(this.state.controls ? " control-active" : "")
				}
			>
				<div className="search-wrapper">
					<input
						className="search-field"
						type="text"
						value={this.state.val}
						onChange={this.changeVal}
						placeholder="Search products"
					/>
					<button
						className="btn small grey no-shadow"
						onClick={this.search}
					>
						<i className="fa fa-search" />
					</button>
					<button
						className={
							"btn small grey no-shadow" +
							(this.state.controls ? " active" : "")
						}
						onClick={this.toggleControls}
					>
						<i className="fa fa-angle-down" />
					</button>
				</div>
				{this.state.controls && (
					<div className="controls">controls</div>
				)}
			</div>
		);
	}
}
