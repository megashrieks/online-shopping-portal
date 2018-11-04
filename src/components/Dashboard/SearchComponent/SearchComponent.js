import React, { Component } from "react";
import "./SearchComponent.css";
import InputField from "../../InputField/InputField";
export default class SearchComponent extends Component {
	state = {
		val: "",
		controls: false,
		quantity: 1,
		quantityerror: false,
		lprice: 0,
		rprice: 30000,
		priceerror: false
	};
	changeVal = field => ({ target: { value } }) => {
		this.setState({
			[field]: value
		});
	};
	toggleControls = () => {
		this.setState(prevState => ({
			controls: !prevState.controls
		}));
	};
	search = () => {
		let qerror = this.state.quantity < 0;
		let perror = this.state.lprice > this.state.rprice;
		this.setState({
			quantityerror: qerror,
			priceerror: perror
		});
		if (qerror || perror) {
			return;
		}
		this.props.onSearch({
			value: this.state.val,
			controls: {
				quantity: this.state.quantity,
				lprice: this.state.lprice,
				rprice: this.state.rprice
			}
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
						onChange={this.changeVal("val")}
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
					<div className="controls">
						<div>
							<div className="half padded bbx">
								<InputField
									type="number"
									label="quantity"
									value={this.state.quantity}
									error={this.state.quantityerror}
									onChange={this.changeVal("quantity")}
									message={"Quantity should be positive"}
									displayMessage={this.state.quantityerror}
								/>
							</div>
						</div>
						<div className="">
							<div className="half padded bbx">
								<InputField
									type="number"
									label="price lower limit"
									value={this.state.lprice}
									error={this.state.priceerror}
									onChange={this.changeVal("lprice")}
									message={
										"Lower limit must be less than higher limit"
									}
									displayMessage={this.state.priceerror}
								/>
							</div>
							<div className="half padded bbx">
								<InputField
									type="number"
									label="price higher limit"
									value={this.state.rprice}
									error={this.state.priceerror}
									onChange={this.changeVal("rprice")}
									message={
										"higher limit must be greater than lower limit"
									}
									displayMessage={this.state.priceerror}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
