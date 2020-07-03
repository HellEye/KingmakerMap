import React, {Component} from 'react'
import Hexagon from "react-hexagon"
import {observer} from "mobx-react"
import "../../res/css/Board/Hexagon.css"
import {selectedHex} from "./HexGrid"
import {observe} from "mobx"

class Hex extends Component {
	static startOffsetX = 25
	static startOffsetY = 6
	hexData = null;
	draggingStart = {
		x: 0, y: 0
	}

	constructor(props) {
		super(props)
		/*this.state = {
			hexData: props.hexData,
			kingdom: null
		}*/
		this.renderData = {
			left:
				Hex.startOffsetX + //align to hexes on board
				this.props.coords.x * this.props.size  //offset by the size
				+ this.props.coords.y % 2 * this.props.size / 2 //offset by half if on even row
				+ this.props.margin * this.props.coords.x, //add a margin between elements
			top:
				Hex.startOffsetY //align to hexes on board
				+ this.props.coords.y * this.props.size * 0.86 //offset by the size (reduced because of tiling
				+ this.props.margin * this.props.coords.y * 1.2 //add margin (with weird multiplier)
		}
	}

	getDivStyle() {
		return {
			position: "absolute",
			top: `${this.renderData.top}px`,
			left: `${this.renderData.left}px`,
			width: this.props.size,
			height: this.props.size

		}
	}

	getHexStyle() {
		let stroke = "#00000001"
		if (this.props.hexData && this.props.hexData.ownedBy) {
			stroke = this.props.hexData.ownedBy.color + "a0"
		}
		return {
			stroke: stroke,
			cursor: 'default',
			fill: this.props.hexData === selectedHex.get() ? "#ffffff40" : "#ffffff01"
		}
	}

	onHexClick = (e) => {
		if (Math.abs(e.clientX - this.draggingStart.x) < 10 && Math.abs(e.clientY - this.draggingStart.y) < 10)
			this.props.selectHex(this.props.hexData)
	}

	onDragStart = (e) => {
		this.draggingStart = {x: e.clientX, y: e.clientY}
	}

	componentDidMount() {
		this._isMounted = true
		this.onHexChange = observe(selectedHex, (change) => {
			if (this._isMounted)
				this.forceUpdate()
		})
		/*const kingdomsLoaded = observe(kingdoms, "finishedLoading", change => {
			if (change && this._isMounted) {
				this.setState({
					...this.state,
					kingdom: this.state.hexData.ownedBy
				})
				kingdomsLoaded()
			}
		})

		this.onKingdomChange = observe(this.state.hexData, "ownedBy", change => {
			if (this._isMounted)
				this.setState({
						...this.state,
						kingdom: this.state.hexData.ownedBy
					}
				)
		})*/
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.onHexChange()
	}


	render() {
		return (
			<div style={this.getDivStyle()}
			     onMouseDown={this.onDragStart}
			>
				<Hexagon style={this.getHexStyle()}
				         onClick={this.onHexClick}
				         className={'hexagonInner'}/>
			</div>
		)

	}
}


export default observer(Hex)