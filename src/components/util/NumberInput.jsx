import React, {Component} from "react"
import "../../res/css/UI/numberInput.css"
class NumberInput extends Component{
	constructor(props) {
		super(props);
		this.state = {
			inputValue: props.value
		}
	}

	handleChange = (e) => {
		const value=e.target.value
		this.setState((prevState) => {
			const inputValue = parseInt(value)
			this.props.changeCallback({name: this.props.name, value: inputValue})
			return {inputValue: inputValue}
		})
		this.forceUpdate()
	}

	onNumberArrowClick = (up) => (event) => {
		this.setState((prevState) => {
			const inputValue = parseInt(prevState.inputValue) + (up ? 1 : -1)
			this.props.changeCallback({name: this.props.name, value: inputValue})
			this.props.saveCallback()
			return {inputValue: inputValue}
		})
		this.forceUpdate()
	}
	render() {
		return (
			<div>
				<input
					type={"number"}
					name={this.props.name}
					value={this.state.inputValue}
					onChange={this.handleChange}
					onBlur={this.props.saveCallback}
				/>
				<div
					className={"numberInput numberInputUp"}
					onClick={this.onNumberArrowClick(true)}>
					+
				</div>
				<div
					className={"numberInput numberInputDown"}
					onClick={this.onNumberArrowClick(false)}>
					–
				</div>
			</div>
		)
	}
}
export default NumberInput