import React, { Component } from "react"
import "../../res/css/Board/Board.css"
import { getCookie, setCookie } from "../../scripts/utils/cookies"
import Checkbox from "@material-ui/core/Checkbox"
import HexGrid from "./HexGrid"
import  markers  from "../../scripts/kingdom/data/hexes/Markers"
import BoardMarker from "./BoardMarker"
import BoardContextMenu from "./BoardContextMenu"
import { observer } from "mobx-react"

import boardSettingsExpandIcon from "../../res/img/icons/Arrow.png"
import image from "../../res/img/stolenLandsMap.jpg"
const BoardContext = React.createContext({
	mapOpacity: 1,
	displayIcons: true,
	displayBorders: true,
	displayLabels: true
})
const hexGrid = <HexGrid />

class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scale: 1.0,
			dimensions: {},
			position: {
				x: 0,
				y: 0
			},
			settingsExpanded: false,
			contextMenu: {
				open: false,
				x: 0,
				y: 0
			},
			boardContextValue: {
				mapOpacity: 1,
				displayIcons: true,
				displayBorders: true,
				displayLabels: true
			},
			scrolledRecently:false
		}
		this.scaleBounds = {
			min: 0.2,
			max: 1.5,
			step: 0.1 //0.1 is good
		}
		this.dragData = {
			dragStartPosition: {
				x: 0,
				y: 0
			},
			initialMapPosition: {
				x: 0,
				y: 0
			},
			dragging: false
		}
		this.markers = markers
	}

	getMousePosOnImage(image, x, y, scale) {
		let rect = image.getBoundingClientRect()
		return {
			left: (x - rect.left) / scale,
			top: (y - rect.top) / scale
		}
	}

	onMapDragStartHandler = (event) => {
		this.dragData = {
			dragStartPosition: { x: event.clientX, y: event.clientY },
			initialMapPosition: { x: this.state.position.x, y: this.state.position.y }
		}
		this.dragData.dragging = true
	}

	componentDidMount() {
		const prevPosition = {
			x: getCookie("boardPosX"),
			y: getCookie("boardPosY"),
			scale: getCookie("boardScale")
		}
		if (prevPosition.scale !== "") {
			this.setState(
				{
					scale: parseFloat(prevPosition.scale)
				},
				this.forceUpdate
			)
		}
		if (prevPosition.x !== "" && prevPosition.y !== "") {
			this.setState(
				{
					position: {
						x: parseFloat(prevPosition.x),
						y: parseFloat(prevPosition.y)
					}
				},
				this.forceUpdate
			)
		}
	}

	savePosToCookie() {
		try {
			setCookie("boardPosX", this.state.position.x, 365)
			setCookie("boardPosY", this.state.position.y, 365)
			setCookie("boardScale", this.state.scale, 365)
		} catch (error) {}
	}

	onMapDragHandler = (event) => {
		if (!this.dragData.dragging) return
		let mousePos = {
			x: event.clientX,
			y: event.clientY
		}
		event.stopPropagation()
		event.preventDefault()

		this.setState(() => {
			return {
				position: {
					x:
						this.dragData.initialMapPosition.x -
						this.dragData.dragStartPosition.x +
						mousePos.x,
					y:
						this.dragData.initialMapPosition.y -
						this.dragData.dragStartPosition.y +
						mousePos.y
				}
			}
		})
	}

	onMapScrollHandler = (event) => {
		event.stopPropagation()
		event.preventDefault()
		// this.setState({ scrolledRecently: true })
		this.lastScrollTime = Date.now()
		let zoom = event.deltaY > 0 ? 1 : -1
		let mousePos = this.getMousePosOnImage(
			event.currentTarget,
			event.clientX,
			event.clientY,
			this.state.scale
		)

		let newScale = this.state.scale - zoom * this.scaleBounds.step
		if (newScale < this.scaleBounds.min) newScale = this.scaleBounds.min
		else if (newScale > this.scaleBounds.max) newScale = this.scaleBounds.max

		// Milo's play time
		// if(newScale<this.scaleBounds.min || newScale>this.scaleBounds.max) this.scaleBounds.step=-this.scaleBounds.step

		let newMousePos = this.getMousePosOnImage(
			event.currentTarget,
			event.clientX,
			event.clientY,
			newScale
		)
		this.setState((prevState) => {
			return {
				scale: newScale,
				position: {
					x:
						prevState.position.x +
						(newMousePos.left - mousePos.left) * newScale,
					y: prevState.position.y + (newMousePos.top - mousePos.top) * newScale
				}
			}
		})
		this.savePosToCookie()
	}

	endDragging = () => {
		this.dragData.dragging = false
		this.savePosToCookie()
	}

	getZoomFill = () => {
		return (
			((this.state.scale - this.scaleBounds.min) /
				(this.scaleBounds.max - this.scaleBounds.min)) *
				100 +
			"%"
		)
	}

	toggleSettings = () => {
		this.setState({
			settingsExpanded: !this.state.settingsExpanded
		})
	}

	onMapContextMenu = (open) => (e) => {
		if (e) e.preventDefault()
		const clickPos = e
			? this.getMousePosOnImage(
					e.currentTarget,
					e.clientX,
					e.clientY,
					this.state.scale
			  )
			: {
					left: 0,
					top: 0
			  }
		this.setState({
			contextMenu: {
				open: open,
				x: clickPos.left - 5,
				y: clickPos.top - 5
			}
		})
	}

	render() {
		// if (Date.now() - this.lastScrollTime > 200)
		// 	this.setState({ scrolledRecently: false })
		return (
			<div
				className={"board"}
				onMouseMove={this.onMapDragHandler}
				onMouseDown={this.onMapDragStartHandler}
				onMouseUp={this.endDragging}
				onMouseLeave={this.endDragging}
			>
					<BoardContext.Provider value={this.state.boardContextValue}>

				<div
					className={"map " + (this.state.scrolledRecently ? "zoom" : "")}
					id={"map"}
					onWheel={this.onMapScrollHandler}
					onContextMenu={this.onMapContextMenu(true)}
					style={{
						// scale: this.state.scale,
						left: this.state.position.x,
						top: this.state.position.y,
						transformOrigin: "top left",
						transform: `scale(${this.state.scale})`
					}}
				>
					<img
						alt={"Map"}
						draggable={"false"}
						src={image}
						style={{
							opacity: this.state.boardContextValue.mapOpacity
						}}
					/>
						{hexGrid}

					{markers.loaded
						? markers.markerList.map((v, i) => {
								return (
									<BoardMarker marker={v} key={v.id} scale={this.state.scale} />
								)
						  })
						: ""}
					{this.state.contextMenu.open ? (
						<BoardContextMenu
							data={this.state.contextMenu}
							onMouseLeave={this.onMapContextMenu(false)}
							scale={this.state.scale}
							onOptionSelected={this.onMapContextMenu(false)}
						/>
					) : (
						""
					)}
				</div>
				<div
					className={"boardSettings"}
					style={{
						width: this.state.settingsExpanded ? "60%" : "180px"
					}}
					onMouseMove={(e) => {
						e.stopPropagation()
					}}
				>
					<div className={"boardSettingsIcon"} onClick={this.toggleSettings}>
						<img
							alt={"arrow"}
							src={boardSettingsExpandIcon}
							style={{
								transform: `rotate(${this.state.settingsExpanded ? 180 : 0}deg)`
							}}
						/>
					</div>
					{this.state.settingsExpanded ? (
						<>
							<Checkbox
								checked={this.state.boardContextValue.displayBorders}
								onChange={(e) => {
									this.setState({
										boardContextValue: {
											...this.state.boardContextValue,
											displayBorders: e.target.checked
										}
									})
								}}
							/>
							<h4>Borders</h4>
							<Checkbox
								checked={this.state.boardContextValue.displayIcons}
								onChange={(e) => {
									this.setState({
										boardContextValue: {
											...this.state.boardContextValue,
											displayIcons: e.target.checked
										}
									})
								}}
							/>
							<h4>Icons</h4>
							<Checkbox
								checked={this.state.boardContextValue.displayLabels}
								onChange={(e) => {
									this.setState({
										boardContextValue: {
											...this.state.boardContextValue,
											displayLabels: e.target.checked
										}
									})
								}}
							/>
							<h4>Labels</h4>
							<input
								type={"range"}
								min={0}
								max={1}
								step={0.01}
								value={this.state.boardContextValue.mapOpacity}
								onChange={(e) => {
									e.stopPropagation()
									this.setState({
										boardContextValue: {
											...this.state.boardContextValue,
											mapOpacity: e.target.value
										}
									})
								}}
							/>
							<h4>Map opacity</h4>
						</>
					) : (
						""
					)}
					<div className={"boardZoomIndicatorWrapper"}>
						<div className={"boardZoomIndicator"}>
							<div
								className={"boardZoomIndicatorInner"}
								style={{ width: this.getZoomFill() }}
							/>
						</div>
					</div>
				</div>
				</BoardContext.Provider>
			</div>
		)
	}
}

export default observer(Board)
export { BoardContext }
