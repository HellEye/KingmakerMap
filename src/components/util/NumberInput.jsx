import React, {Component} from "react"
import "../../res/css/UI/numberInput.css"
import {observer} from "mobx-react"

class NumberInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: props.value
		}
	}

	setValue = (value) => {
		this.setState({
			...this.state,
			inputValue: value
		})
	}

	handleChange = (e) => {
		let value = e.target.value
		while (value.length > 1 && value.charAt(0) === "0") {
			value = value.substr(1)
		}
		this.setState((prevState) => {
			const inputValue = parseInt(value) || 0
			this.props.changeCallback({name: this.props.name, value: inputValue})
			return {inputValue: inputValue}
		})
		this.forceUpdate()
	}

	onNumberArrowClick = (up) => (event) => {
		let value = 1
		if (event.ctrlKey)
			value *= 5
		if (event.shiftKey)
			value *= 10
		this.setState((prevState) => {
			const inputValue = parseInt(prevState.inputValue) + (up ? value : -value)
			this.props.changeCallback({name: this.props.name, value: inputValue})
			this.props.saveCallback()
			return {inputValue: inputValue}
		})
		this.forceUpdate()
	}

	render() {
		return (
			<div className={"numberInput " + (this.props.className || "")}>
				<div className={`numberInputWrapper ${this.props.className + "_wrapper" || ""}`}>
					<input
						className={`numberInputField ${this.props.className + "_input" || ""}`}
						type={"number"}
						name={this.props.name}
						value={this.state.inputValue.toString()}
						onChange={this.handleChange}
						onFocus={this.props.onFocus}
						onBlur={this.props.saveCallback}
					/>
					{this.props.disableButtons ? "" : <div
						className={`numberInputButton numberInputUp ${this.props.className + "_button" || ""}`}
						onClick={this.onNumberArrowClick(true)}
					>
						+
					</div>}
					{this.props.disableButtons ? "" : <div
						className={`numberInputButton numberInputDown ${this.props.className + "_button" || ""}`}
						onClick={this.onNumberArrowClick(false)}>
						–
					</div>}
				</div>
			</div>

		)
	}
}

export default observer(NumberInput)