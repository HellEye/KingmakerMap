import React, { Component } from "react"

class TextIconButton extends Component {
	render() {
		if (
			this.props.value.includes(".png") ||
			this.props.value.includes(".jpg") ||
			this.props.value.includes(".jpeg")
		)
			return (
				<div className={this.props.className} onClick={this.props.onClick}>
					<img src={this.props.value} alt={this.props.alt || ""} />
				</div>
			)
		else
			return (
				<input
					type={"button"}
					className={this.props.className}
					onClick={this.props.onClick}
					value={this.props.value}
				/>
			)
	}
}

class ConfirmButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmStarted: false,
		}
	}

	startConfirm = () => {
		this.setState((state) => {
			return { ...state, confirmStarted: true }
		})
	}
	cancel = () => {
		this.setState(
			(state) => {
				return { ...state, confirmStarted: false }
			},
			() => {
				this.forceUpdate()
			}
		)
	}
	confirm = (e) => {
		this.props.callback(e)
	}

	render() {
		return (
			<div onMouseLeave={this.cancel}>
				{this.state.confirmStarted ? (
				<TextIconButton
					className={this.props.secondClass}
					onClick={this.confirm}
					value={this.props.second}
				/>
				) : (
				<TextIconButton
					className={this.props.firstClass}
					onClick={this.startConfirm}
					value={this.props.first}
				/>
				)}
			</div>
		)
	}
}

export default ConfirmButton
