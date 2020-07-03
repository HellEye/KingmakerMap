import React, {Component} from "react"
import "../../res/css/Board/Board.css"
import {Kingdom, kingdoms} from "../../scripts/kingdom/data/kingdoms"
import "../../res/css/UI/Button.css"
import "../../res/css/Panels/KingdomDisplay.css"
import {BlockPicker} from "react-color"
import {observer} from "mobx-react"
import makeCancelable from "../../scripts/utils/makeCancellable"
import ConfirmButton from "../util/ConfirmButton"

const deleteIcon = require("../../res/img/icons/deleteIcon.png")

class Kingdoms extends Component {

	addKingdom = () => {
		kingdoms.push(new Kingdom("Name"))
			.then(() => this.forceUpdate())
	}

	render() {
		const kingdomList = kingdoms.map((k, index) => <KingdomDisplay kingdom={k} index={index} key={index}/>)
		return (
			<div className={"board kingdomDisplayWrapper"}>
				<h1>
					Kingdom list
				</h1>
				<input type={"button"} className={"button"} value={"Add"} onClick={this.addKingdom}
				style={{width:80}}/>

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
			index: props.index,
			kingdom: props.kingdom,
			pickingColor: false,
			tryingToRemove: false
		}
	}

	popupPosition = {
		x: 0,
		y: 0
	}
	removePromise = null
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
		this.editFinished()
	}


	confirmRemove = (e) => {
		this.removePromise = makeCancelable(kingdoms.remove(this.state.index))
		this.removePromise.promise
			.then(() => {
				this.setState({tryingToRemove: false})
				this.removePromise=null
			})
			.catch((reason) => {
				if (!reason.isCanceled)
					console.error("Database failed", reason)
				this.removePromise=null
			})

	}

	componentWillUnmount = () => {
		if (this.removePromise != null)
			this.removePromise.cancel()
		this.removePromise=null
	}

	editFinished = () => {
		kingdoms.editFinished(this.state.index)
			.then()
	}
	//TODO fix this stupid uncontrolled input error thing (when adding a new field and editing the name
	//TODO and some random other error about cancelling async tasks?
	render() {
		console.log(deleteIcon)
		const popover = {}
		return (
			<div className={"kingdomDisplay"}>
				<input className={"kingdomName"}
				       type={"text"}
				       value={this.state.kingdom.name}
				       onChange={this.updateKingdomName}
				       onBlur={this.editFinished}
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

				{
					<ConfirmButton
						callback={this.confirmRemove}
						first={deleteIcon}
						firstClass={"removeKingdom"}
						second={"Confirm"}
						secondClass={"buttonRed button confirmRemoveKingdom"}
					/>
				}

			</div>
		)
	}
}

export default observer(Kingdoms)