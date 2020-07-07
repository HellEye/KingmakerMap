import React, {Component} from "react"
import {observer} from "mobx-react"
import {computedFn} from "mobx-utils"
//please don't touch my mess ;-;
const rotations = {
	1: [
		[{x: 0, y: 0}],
		[{x: 0, y: 0}],
		[{x: 0, y: 0}],
		[{x: 0, y: 0}],
	],
	2: [
		[{x: 0, y: 0}, {x: 1, y: 0}],
		[{x: 0, y: 1}, {x: 0, y: 0}],
		[{x: 1, y: 0}, {x: 0, y: 0}],
		[{x: 0, y: 0}, {x: 0, y: 1}],

	],
	4: [ //   0              1            2             3
		[{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}],
		[{x: 0, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}],
		[{x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}],
		[{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}],

	],
}

const BuildingGridSquare = observer(class BuildingGridSquare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buildingData: this.props.district.buildingGrid.getBuilding(props.x, props.y),
		}
	}


	isHighlighted = (value) => {
		return (this.props[value].x === this.props.x && this.props[value].y === this.props.y)
			|| (this.props[value] && this.props[value].data
				&& this.state.buildingData
				&& this.props[value].data.id === this.state.buildingData.id)
			|| (this.props[value]
				&& this.props[value].x === this.props.x
				&& this.props[value].y === this.props.y)
	}
	isSelected = () => {
		return this.isHighlighted("selectedSquare")
	}
	isHovered = () => {
		return this.isHighlighted("hoveredSquare")
	}


	onSelect = (e) => {
		//TODO check if fits
		if (this.isSelected() && !this.state.buildingData && this.props.selectedBuilding) {
			this.props.district.buildingGrid.addBuilding(
				this.props.x,
				this.props.y,
				this.props.selectedBuilding,
				this.props.rotation)
			this.setState({
				buildingData: this.props.district.buildingGrid.getBuilding(this.props.x, this.props.y),
			})
		} else {
			this.props.onSelect(this.props.x, this.props.y, this.state.buildingData)
		}
	}
	onHover = (e) => {
		this.props.onHover(this.props.x, this.props.y, this.state.buildingData)
	}
	onMouseLeave = (e) => {
		this.props.onHover(-5, -5)
	}

	getImageData = () => {
		const imageData = {imageIndex: -1, building: null, rotation: 0}
		const info = {buildingX: -1, buildingY: -1, rotation: -1, building: null}
		if (this.state.buildingData) {
			info.buildingX = this.state.buildingData.x
			info.buildingY = this.state.buildingData.y
			info.building = this.state.buildingData.building
			info.rotation = this.state.buildingData.rotation
		} else if (this.props.selectedBuilding && this.props.shouldDisplay) {
			info.buildingX = this.props.hoveredSquare.x
			info.buildingY = this.props.hoveredSquare.y
			info.building = this.props.selectedBuilding
			info.rotation = this.props.rotation
		}
		if (info.buildingX === -1) return imageData
		imageData.imageIndex =
			(
				(((this.props.y - info.buildingY) > 0 && info.building.size === 4
					? ((this.props.x - info.buildingX + 1) % 2)
					: ((info.building.size === 4)
						? (this.props.x - info.buildingX)
						: ((this.props.x - info.buildingX) + ((info.rotation === 1 || info.rotation === 2) ? 1 : 0)))))
				+ ((this.props.y - info.buildingY) * Math.ceil(info.building.size / 2))
				- info.rotation + 4
			) % info.building.size

		imageData.building = info.building
		imageData.rotation = info.rotation
		return imageData
	}

	render() {
		const {imageIndex, building, rotation} = this.getImageData()

		return (
			<div
				onClick={this.onSelect}
				onMouseEnter={this.onHover}
				onMouseLeave={this.onMouseLeave}
				className={
					"buildingGridBuildingsGridSquare "
					+ (this.isSelected() ? "buildingGridBuildingsGridSquare_selected " : "")
					+ (this.isHovered() ? "buildingGridBuildingsGridSquare_hovered " : "")
					+ ((this.isHovered()) && this.props.wrong
						? "buildingGridBuildingsGridSquare_incorrect " : "")
				}
			>
				{(imageIndex >= 0) ?
					<img
						style={{
							transform: `rotate(${rotation * 90}deg)`,
						}}
						src={building.image[imageIndex]}
						alt={""}
					/>
					: ""
				}
			</div>
		)
	}
})


class BuildingGridBuildings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hovered: {
				x: undefined,
				y: undefined,
			},
			selected: {
				x: undefined,
				y: undefined,
			},
			rotation: 0,
			wrong: false,
		}
	}


	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}

	changeRotation = (event) => {
		const change = event.deltaY > 0 ? 1 : -1;
		let newRotation = this.state.rotation + change;
		while (newRotation < 0)
			newRotation += 4
		while (newRotation > 3) {
			newRotation -= 4
		}
		console.log(newRotation)
		this.setState({
			...this.state,
			rotation: newRotation,
		})
	}

	getPos = (i, j) => {
		return i * 2 + (j < 2 ? j : j + 4) + Math.floor(i / 3) * 6
	}
	addBuilding = (x, y, building) => {
		this.props.district.buildingGrid.addBuilding(x, y, building)
		this.forceUpdate()
	}

	onSquareHover = (x, y, data) => {
		this.setState({
				hovered: {x: x, y: y, data: data},
			},
		)
	}
	onSquareSelect = (x, y, data) => {
		this.setState({
			selected: {x: x, y: y, data: data},
		})
	}

	shouldBuildingDisplay = (x, y) => {
		if (!this.props.selectedBuilding) return false
		const b = this.props.selectedBuilding
		const br = this.state.rotation
		const {x: bx, y: by} = this.state.hovered
		return (x === bx && y === by)
			|| (x === bx + 1 && y === by && (b.size === 4 || (b.size === 2 && br % 2 === 0)))
			|| (x === bx && y === by + 1 && (b.size === 4 || (b.size === 2 && br % 2 === 1)))
			|| (x === bx + 1 && y === by + 1 && b.size === 4)
	}

	isWrong = (x, y)=> {
		if (!this.props.selectedBuilding) return false
		const buildingHere = this.props.district.buildingGrid.getBuilding(x, y)
		// console.log(`x: ${x} y:${y}`, buildingHere)
		return typeof buildingHere !== 'undefined'
	}
	//TODO try using context instead of mapping all the time
	render() {
		//TODO tooltip on hovering over existing buildings

		const buildingGridSquares = [...Array(9).keys()].map(i => {
			return <div key={i} className={"buildingGridBuildingsGridInner"}>
				{[...Array(4).keys()]
					.map((j) => {
						return this.getPos(i, j)
					})
					.map(pos => {
						return {x: pos % 6, y: Math.floor(pos / 6), pos: pos}
					})
					.map(({x, y, pos}) => {
						return <BuildingGridSquare
							key={pos}
							x={x}
							y={y}
							onHover={this.onSquareHover}
							onSelect={this.onSquareSelect}
							district={this.props.district}
							shouldDisplay={this.shouldBuildingDisplay(x, y)}
							selectedBuilding={this.props.selectedBuilding}
							onBuild={this.addBuilding}
							rotation={this.state.rotation}
							hoveredSquare={this.state.hovered}
							selectedSquare={this.state.selected}
							wrong={this.isWrong(x, y)}
						/>
					})}
			</div>
		})
		return (
			<div className={"buildingGridBuildings"}
			     onWheel={this.changeRotation}
			>
				<h3>{this.props.selectedBuilding ? this.props.selectedBuilding.name : "none"}</h3>
				<div className={"buildingGridBuildingsGrid"}>
					{buildingGridSquares}
				</div>
			</div>
		)
	}
}


export default observer(BuildingGridBuildings)