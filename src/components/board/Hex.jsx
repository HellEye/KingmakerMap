import React, { Component } from "react"
import Hexagon from "react-hexagon"
import "../../res/css/Board/Hexagon.css"
import { selectedHex } from "./HexGrid"
import { makeObservable, observe, autorun, action } from "mobx"
import { observer } from "mobx-react"
import { BoardContext } from "./Board"

import settlementIcon from "../../res/img/icons/map/Settlement.png"
import { computedFn } from "mobx-utils"


class Hex extends Component {
	static startOffsetX = 25
	static startOffsetY = 6
	hexData = null
	draggingStart = {
		x: 0,
		y: 0,
	}

	constructor(props) {
		super(props)

		this.renderData = {
			left:
				Hex.startOffsetX + //align to hexes on board
				this.props.coords.x * this.props.size + //offset by the size
				((this.props.coords.y % 2) * this.props.size) / 2 + //offset by half if on even row
				this.props.margin * this.props.coords.x, //add a margin between elements
			top:
				Hex.startOffsetY + //align to hexes on board
				this.props.coords.y * this.props.size * 0.86 + //offset by the size (reduced because of tiling
				this.props.margin * this.props.coords.y * 1.2, //add margin (with weird multiplier)
		}
		this.state={
			hovered:false
		}
	}

	getDivStyle() {
		return {
			position: "absolute",
			top: `${this.renderData.top}px`,
			left: `${this.renderData.left}px`,
			width: this.props.size,
			height: this.props.size,
		}
	}

	getHexStyle(displayBorders) {
		let stroke = "#00000001"
		if (displayBorders && this.props.hexData && this.props.hexData.ownedBy) {
			stroke = this.props.hexData.ownedBy.color + "a0"
		}
		// console.log(this.props.hexData?.ownedBy)
		return {
			stroke: stroke,
			cursor: "default",
			zIndex: 11,
			fill:
				this.props.hexData === selectedHex.get() ? "#ffffff40" : "#ffffff01",
		}
	}

	onHexClick = (e) => {
		if (
			Math.abs(e.clientX - this.draggingStart.x) < 10 &&
			Math.abs(e.clientY - this.draggingStart.y) < 10
		)
			this.props.selectHex(this.props.hexData)
	}

	onDragStart = (e) => {
		this.draggingStart = { x: e.clientX, y: e.clientY }
	}

	componentDidMount() {
		this._isMounted = true
		// this.onHexChange = autorun(() => {
		// 	if (this._isMounted)
		// 		this.forceUpdate()
		// })
		this.onHexChange = autorun(() => {

			if (
				selectedHex.get() === this.props.hexData ||
				selectedHex.previousHex === this.props.hexData
			) {
				this.forceUpdate()
			}
		})
	}
	//old db code just in case
	/**
	 * const kingdomsLoaded = observe(kingdoms, "finishedLoading", change => {
	 *	if (change && this._isMounted) {
	 *		this.setState({
	 *			...this.state,
	 *			kingdom: this.state.hexData.ownedBy
	 *		})
	 *		kingdomsLoaded()
	 *}
	 *})
	 *
	 *this.onKingdomChange = observe(this.state.hexData, "ownedBy", change => {
	 *if (this._isMounted)
	 *this.setState({
	 *...this.state,
	 *kingdom: this.state.hexData.ownedBy
	 *}
	 *)
	 *})
	 */

	componentWillUnmount() {
		this._isMounted = false
		// this.onHexChange()
	}
	onHexHover = ()=>{
		this.setState({hovered:true})
	}
	onHexHoverLeave = ()=>{
		this.setState({hovered:false})
	}

	render() {
		const hexData = this.props.hexData
		const improvements = hexData
			? hexData.hexImprovements.filter((v) => v.icon)
			: []
		const label = hexData ? hexData.label : ""
		if (hexData.settlement)
			improvements.unshift({ improvement: { icon: settlementIcon } })

		return (
			<BoardContext.Consumer>
				{({ mapOpacity, displayIcons, displayBorders, displayLabels }) => {
					return (
						<div style={this.getDivStyle()} 
						onMouseDown={this.onDragStart}
						onMouseOver={this.onHexHover}
								onMouseLeave={this.onHexHoverLeave}
						>
							<Hexagon
								style={this.getHexStyle(displayBorders)}
								
								onClick={this.onHexClick}
								className={"hexagonInner "+(this.state.hovered?"hovered":"")}
							/>
							{displayLabels ? (
								<div 
								className={"hexLabel"} 
								onClick={this.onHexClick}
								>
									<h2
										style={{
											color:
												hexData && hexData.ownedBy
													? hexData.ownedBy.color
													: "#1a88d8",
										}}
										className={"hexLabelText"}
									>
										{label}
									</h2>
								</div>
							) : (
								""
							)}
							{displayIcons && improvements.length > 0 ? (
								<div className={"hexIcons"} onClick={this.onHexClick}>
									{improvements.map((v, i) => {
										return (
											<img
												src={v.icon}
												alt={""}
												key={i}
												style={{
													filter:
														mapOpacity <= 0.4 ? "invert() brightness(65%)" : "",
												}}
											/>
										)
									})}
								</div>
							) : (
								""
							)}
						</div>
					)
				}}
			</BoardContext.Consumer>
		)
	}
}

export default observer(Hex)
