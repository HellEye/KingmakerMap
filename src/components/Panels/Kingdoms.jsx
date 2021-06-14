import React, {Component} from "react"
import "../../res/css/Board/Board.css"
import {kingdoms} from "../../scripts/kingdom/data/kingdoms"
import "../../res/css/UI/Button.css"
import "../../res/css/Panels/KingdomDisplay.css"
import {BlockPicker} from "react-color"
import {observer} from "mobx-react"
import ConfirmButton from "../util/ConfirmButton"
import deleteIcon from "../../res/img/icons/deleteIcon.png"


class Kingdoms extends Component {

	addKingdom = () => {
		kingdoms.createNew()
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

const KingdomDisplay = observer(class KingdomDisplay extends Component {

	constructor(props) {
		super(props)
		this.state = {
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
		this.props.kingdom.setName(e.target.value)
	}
	startPickingColor = (e) => {
		this.setState({pickingColor:true})
	}
	changeColor = (color, e) => {
		this.props.kingdom.setColor(color.hex)
	}
	stopPickingColor = (color, e) => {
		this.props.kingdom.setColor(color.hex)
		this.setState({pickingColor:false})
	}


	confirmRemove = (e) => {
		kingdoms.remove(this.props.kingdom.id)
	}

	componentWillUnmount = () => {
		if (this.removePromise != null)
			this.removePromise.cancel()
		this.removePromise=null
	}

	render() {
		const popover = {}
		return (
			<div className={"kingdomDisplay"}>
				<input className={"kingdomName"}
				       type={"text"}
				       value={this.props.kingdom.name}
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
								color={this.props.kingdom.color}
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
})

export default observer(Kingdoms)