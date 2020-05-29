import React, {Component} from "react"
import "../../res/css/Board/Board.css"
import {Kingdom, kingdoms} from "../../scripts/kingdom/data/kingdoms"
import "../../res/css/UI/Button.css"
import "../../res/css/Panels/KingdomDisplay.css"
import {BlockPicker} from "react-color"

class Kingdoms extends Component {

	constructor(props) {
		super(props)
		this.state = {
			kingdoms: kingdoms
		}
	}

	addKingdom = () => {
		kingdoms.push(new Kingdom("Name"))
		this.forceUpdate()
	}

	render() {
		const kingdomList = kingdoms.map((k, index) => <KingdomDisplay kingdom={k} key={index}/>)
		return (
			<div className={"board"}>
				<h1>
					Kingdom display
				</h1>
				<input type={"button"} className={"button"} value={"Add"} onClick={this.addKingdom}/>

				<div className={"kingdomList"}>
					{kingdomList}
				</div>

			</div>
		)
	}
}

class KingdomDisplay extends Component {

	constructor(props) {
		super(props)
		this.state = {
			kingdom: props.kingdom,
			pickingColor: false
		}
	}

	popupPosition = {
		x: 0,
		y: 0
	}

	updateKingdomName = (e) => {
		const newState = this.state
		newState.kingdom.name = e.target.value
		this.setState(newState)
	}
	startPickingColor = (e) => {
		const newState = this.state
		newState.pickingColor = true
		this.setState(newState)
	}
	changeColor = (color, e) => {
		const newState = this.state
		newState.kingdom.color = color.hex
		this.setState(newState)
	}
	stopPickingColor = (color, e) => {
		const newState = this.state
		newState.pickingColor = false
		newState.kingdom.color = color.hex
		this.setState(newState)
	}

	render() {
		const popover = {

		}
		return (
			<div className={"kingdomDisplay"}>
				<input className={"kingdomName"}
				       type={"text"}
				       value={this.state.kingdom.name}
				       onChange={this.updateKingdomName}
				/>
				<div className={"kingdomColor"}
				     style={{
					     backgroundColor: this.props.kingdom.color
				     }}
				     onClick={this.startPickingColor}
				>
					{this.state.pickingColor ?
						<div style={popover}
							className={"colorPickerWrapper"}
						>
								<BlockPicker
									className={"colorPicker"}
									color={this.state.kingdom.color}
									onChange={this.changeColor}
									onChangeComplete={this.stopPickingColor}
								/>
						</div>
						: null}
				</div>

			</div>
		)
	}
}

export default Kingdoms