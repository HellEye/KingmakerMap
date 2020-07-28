import React, {Component} from "react"
import {observer} from "mobx-react"
import BuildingHoverTooltip from "./BuildingHoverTooltip"
import {observe} from "mobx"
import {selectedDistrict} from "../../UI/Sidebar/SidebarComponents/SidebarSettlement"
import {BuildingList} from "../../../scripts/kingdom/data/buildings/buildings"

const BuildingGridContext = React.createContext({
	hovered: [],
	selected: [],
	rotation: 0,
	selectedBuilding: null,
	shouldDisplay: [],
	mode: 0,
})
const gridModeIcons = {
	DISPLAY: require("../../../res/img/icons/buildingGridDisplay.png"),
	BUILD: require("../../../res/img/icons/buildingGridBuild.png"),
	UPGRADE: require("../../../res/img/icons/buildingGridUpgrade.png"),
	DELETE: require("../../../res/img/icons/buildingGridDelete.png"),
}
const GridMode = {
	DISPLAY: 0,
	BUILD: 1,
	UPGRADE: 3,
	DELETE: 2,
}

const BuildingGridSquare = observer(class BuildingGridSquare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buildingData: props.district.buildingGrid.getBuilding(props.x, props.y),
			district: props.district,
		}
	}

	componentDidMount = () => {
		this._isMounted = true
		this.observeDistrict = observe(selectedDistrict,
			change => {
				const buildingData = change.newValue.buildingGrid.getBuilding(this.props.x, this.props.y)
				this.setState({
					district: change.newValue,
					buildingData: buildingData,
				})
				this.changeBuildingListObserver(change.newValue)
			})
		this.buildingsChangedListener=observe(this.props.district.buildingGrid.buildings, change=>{
			if(this._isMounted) {
				this.setState({
						buildingData:this.props.district.buildingGrid.getBuilding(this.props.x, this.props.y)
					})
			}
		})
		this.changeBuildingListObserver(this.props.district)
	}
	changeBuildingListObserver = (district) => {
		if (this.observeBuildingList)
			this.observeBuildingList()

		this.observeBuildingList = observe(district.buildingGrid.buildings,
			buildingChange => {
				if (this._isMounted) {
					if (buildingChange.addedCount > 0)
						this.setState({
							buildingData: this.state.district.buildingGrid.getBuilding(this.props.x, this.props.y),
						})
					else if (buildingChange.removedCount > 0 && this.state.buildingData
						&& buildingChange.removed.some(v => v.id === this.state.buildingData.id)) {
						this.setState({
							buildingData: null,
						})
					}
				}
			})
	}

	canBuild = (hovered, district, mode, upgradeFrom) => {
		for (let i = 0; i < hovered.length; i++) {
			if (mode === GridMode.BUILD) {
				if (typeof district.buildingGrid.getBuilding(hovered[i].x, hovered[i].y) !== "undefined")
					return false
			} else if (mode === GridMode.UPGRADE) {
				const hoveredBuildingType = typeof district.buildingGrid.getBuilding(hovered[i].x, hovered[i].y)
				if (hoveredBuildingType !== "undefined" && hoveredBuildingType !== typeof upgradeFrom.building)
					return false
			}
		}
		return true
	}

	componentWillUnmount() {
		this._isMounted = false
		if (this.observeBuildingList)
			this.observeBuildingList()
		this.observeDistrict()
		this.buildingsChangedListener()
	}


	onSelect = (selected, selectedBuilding, rotation, mode, district, upgradingFrom) => (e) => {
		//TODO check if fits
		if (selected) {
			if (!this.state.buildingData && mode === GridMode.BUILD && selectedBuilding) {
				if (this.canBuild(selected, district, mode, upgradingFrom))
					district.buildingGrid.addBuilding(
						this.props.x,
						this.props.y,
						selectedBuilding,
						rotation)
			} else if (mode === GridMode.DELETE && this.state.buildingData) {
				district.buildingGrid.removeBuilding(
					this.state.buildingData.x,
					this.state.buildingData.y)
			} else if (selectedBuilding && mode === GridMode.UPGRADE && (!this.state.buildingData || this.state.buildingData.building.upgradesFrom===selectedBuilding)) {
				if (upgradingFrom) {
					if (this.canBuild(selected, district, mode, upgradingFrom)) {
						district.buildingGrid.removeBuilding()
						district.buildingGrid.addBuilding(
							this.props.x,
							this.props.y,
							selectedBuilding,
							rotation,
						)
						this.props.onUpgrade(null, null)
					}
				} else {
					const upgradesTo = BuildingList.getUpgradeFor(this.state.buildingData.building)
					console.log(upgradesTo)
					if (upgradesTo != null) {
						this.props.onUpgrade(this.state.buildingData, upgradesTo)
					}
				}
			}
			this.props.onSelect(-5, -5)
		} else {
			this.props.onSelect(this.props.x, this.props.y)
		}
	}
	onHover = (e) => {
		this.props.onHover(this.props.x, this.props.y)
	}
	onMouseLeave = (e) => {
		this.props.onHover(-5, -5)
	}

	getImageData = (hoveredSquare, selectedBuilding, rotation, shouldDisplay, district) => {
		const imageData = {imageIndex: -1, building: null, rotation: 0}
		const info = {buildingX: -1, buildingY: -1, rotation: -1, building: null}
		if (selectedBuilding && shouldDisplay) {
			info.buildingX = hoveredSquare.x
			info.buildingY = hoveredSquare.y
			info.building = selectedBuilding
			info.rotation = rotation
		} else if (this.state.buildingData) {
			info.buildingX = this.state.buildingData.x
			info.buildingY = this.state.buildingData.y
			info.building = this.state.buildingData.building
			info.rotation = this.state.buildingData.rotation
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


	checkCoords = (list) => {
		for (let i = 0; i < list.length; i++) {
			if (list[i].x === this.props.x && list[i].y === this.props.y)
				return true
		}
		return false
	}

	checkBuilding = (list, district) => {
		if (!this.state.buildingData) return false
		const buildingUnderCursor = district.buildingGrid.getBuilding(list[0].x, list[0].y)
		return (
			buildingUnderCursor
			&& buildingUnderCursor.id === this.state.buildingData.id
		)
	}

	render() {
		return (
			<BuildingGridContext.Consumer>
				{({hovered, selected, rotation, selectedBuilding, shouldDisplay, mode, district}) => {
					const isSelected = this.checkCoords(selected) || this.checkBuilding(selected, district)
					this._isSelected = isSelected
					const isHovered = this.checkCoords(hovered)
					const isHoveredFullBuilding = this.checkBuilding(hovered, district)
					const displayBuilding = shouldDisplay[this.props.x][this.props.y]
					const {imageIndex, building, rotation: imageRotation} =
						this.getImageData(hovered[0], selectedBuilding, rotation, displayBuilding, district)

					const divRef = React.createRef()
					return <>
						<div
							onClick={this.onSelect(isSelected, selectedBuilding, rotation, mode, district)}
							onMouseEnter={this.onHover}
							onMouseLeave={this.onMouseLeave}
							ref={divRef}
							className={
								"buildingGridBuildingsGridSquare "
								+ (isSelected ? "buildingGridBuildingsGridSquare_selected " : "")
								+ ((isHovered || isHoveredFullBuilding) ? "buildingGridBuildingsGridSquare_hovered " : "")
								+ (isHovered && selectedBuilding
								&& (((mode===GridMode.BUILD||mode===GridMode.UPGRADE) && typeof district.buildingGrid.getBuilding(this.props.x, this.props.y)) !== 'undefined'
								|| (mode===GridMode.UPGRADE && district.buildingGrid.getBuilding(this.props.x, this.props.y).building===selectedBuilding))
									? "buildingGridBuildingsGridSquare_incorrect " : "")
							}
						>
							{(imageIndex >= 0) ?
								<img
									style={{
										transform: `rotate(${imageRotation * 90}deg)`,
									}}
									src={building.image[imageIndex]}
									alt={""}
								/>
								: ""
							}
						</div>
						{(isHovered && mode === GridMode.DISPLAY && this.state.buildingData) ?
							<BuildingHoverTooltip
								building={this.state.buildingData.building}
								hoverObject={divRef}
							/>
							: ""}
					</>
				}
				}
			</BuildingGridContext.Consumer>
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
			mode: 0,
			upgradingFrom: null,
		}
	}

	district = {}


	componentDidMount = () => {
		this._isMounted = true
		this.buildingsChangedListener=observe(this.props.district.buildingGrid.buildings, change=>{
			console.log("Buildings changed")
			if(this._isMounted) {
				this.forceUpdate()
			}
		})
	}
	componentWillUnmount = () => {
		this._isMounted = false
		this.buildingsChangedListener()
	}

	changeRotation = (event) => {
		const change = event.deltaY > 0 ? 1 : -1;
		let newRotation = this.state.rotation + change;
		while (newRotation < 0)
			newRotation += 4
		while (newRotation > 3) {
			newRotation -= 4
		}
		this.setState({
			...this.state,
			rotation: newRotation,
		})
	}

	getPos = (i, j) => {
		return i * 2 + (j < 2 ? j : j + 4) + Math.floor(i / 3) * 6
	}

	onSquareHover = (x, y) => {
		this.setState({
				hovered: {x: x, y: y},
			},
		)
	}
	onSquareSelect = (x, y) => {
		this.setState({
			selected: {x: x, y: y},
		})
	}
	startUpgrade = (buildingData, building) => {
		this.setState({
			upgradingFrom: buildingData,
		})
		this.props.onUpgrade(building)
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

	isWrong = (x, y) => {
		if (!this.props.selectedBuilding) return false
		const buildingHere = this.props.district.buildingGrid.getBuilding(x, y)
		return typeof buildingHere !== 'undefined'
	}
	buildingGridSquares = [...Array(9).keys()].map(i => {
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
						district={this.props.district}
						onHover={this.onSquareHover}
						onSelect={this.onSquareSelect}
						onUpgrade={this.startUpgrade}
					/>
				})}
		</div>
	})

	getHighlightList = (value) => {
		const out = [{...this.state[value]}]

		if (this.props.selectedBuilding) {
			if (this.props.selectedBuilding.size === 2) {
				out.push({
					x: this.state[value].x + (this.state.rotation + 1) % 2,
					y: this.state[value].y + (this.state.rotation) % 2,
				})
			} else if (this.props.selectedBuilding.size === 4) {
				for (let i = 1; i < 4; i++) {
					out.push({
						x: this.state[value].x + i % 2,
						y: this.state[value].y + Math.floor(i / 2),
					})
				}
			}
		}
		return out
	}
	getShouldDisplay = () => {
		const out = [[], [], [], [], [], []]
		for (let y = 0; y < 6; y++) {
			for (let x = 0; x < 6; x++) {
				out[x][y] = (this.state.mode === GridMode.BUILD || this.state.mode === GridMode.UPGRADE) ? this.shouldBuildingDisplay(x, y) : false
			}
		}
		return out
	}


	selectMode = (mode) => (e) => {
		this.setState({
			mode: mode,
			selected: {
				x: -5,
				y: -5,
			},
		})
		if (mode !== GridMode.BUILD)
			this.props.deselectBuilding()
	}

	//TODO try using context instead of mapping all the time
	render() {
		//TODO tooltip on hovering over existing buildings

		return (
			<div className={"buildingGridBuildings"}
			     onWheel={this.changeRotation}
			>
				<div className={"buildingGridBuildingsMode"}>

					{Object.keys(gridModeIcons).map((value, index) => {
						return <div
							key={index}
							className={"buildingGridBuildingsModeIcon "
							+ (this.state.mode === GridMode[value] ? "buildingGridBuildingsModeIcon_selected" : "")}
							onClick={this.selectMode(GridMode[value])}
						>
							<img src={gridModeIcons[value]}
							     alt={value}/>
						</div>
					})}

				</div>
				<div className={"buildingGridBuildingsGrid"}>
					<BuildingGridContext.Provider value={{
						hovered: this.getHighlightList("hovered"),
						selected: this.getHighlightList("selected"),
						rotation: this.state.rotation,
						selectedBuilding: (this.state.mode === GridMode.BUILD ||this.state.mode===GridMode.UPGRADE)? this.props.selectedBuilding : null,
						shouldDisplay: this.getShouldDisplay(),
						mode: this.state.mode,
						district: this.props.district,
						upgradingFrom: this.state.upgradingFrom,
					}}>
						{this.buildingGridSquares}
					</BuildingGridContext.Provider>
				</div>
			</div>
		)
	}
}


export default observer(BuildingGridBuildings)