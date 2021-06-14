import React, { Component } from "react"
import { observer } from "mobx-react"
import BuildingHoverTooltip from "./BuildingHoverTooltip"
import {computedFn} from "mobx-utils"
import { observe, observable, action, reaction, makeObservable} from "mobx"
import { BuildingList } from "../../../scripts/kingdom/data/buildings/buildings"
import DISPLAY from "../../../res/img/icons/buildingGridDisplay.png"

import BUILD from "../../../res/img/icons/buildingGridBuild.png"
import UPGRADE from "../../../res/img/icons/buildingGridUpgrade.png"
import DELETE from "../../../res/img/icons/buildingGridDelete.png"

const gridModeIcons = {
	DISPLAY,
	BUILD,
	UPGRADE,
	DELETE,
}
const GridMode = {
	DISPLAY: 0,
	BUILD: 1,
	UPGRADE: 3,
	DELETE: 2,
}
/* hovered,
						selected,
						rotation,
						selectedBuilding,
						shouldDisplay,
						mode,
						district */
const buildingGridStore = {
	selected: {
		x: -5,
		y: -5,
	},
	hovered: {
		x: -5,
		y: -5,
	},
	hoveredList:[],
	selectedList:[],
	rotation: 0,
	selectedBuilding: undefined,
	shouldDisplay: undefined,
	mode: 0,
	district: undefined,
	buildingData:computedFn((x, y)=>{
		return buildingGridStore.district.buildingGrid.getBuilding(x, y)
	})
}

makeObservable(buildingGridStore, {
	selected:observable,
	hovered:observable,
	rotation:observable,
	selectedBuilding:observable,
	shouldDisplay:observable,
	mode:observable,
	district:observable,
})

const BuildingGridSquare = observer(
	class BuildingGridSquare extends Component {

		getBuildingData=()=>{
			return buildingGridStore.buildingData(this.props.x, this.props.y)
		}

		componentDidMount = () => {
			this._isMounted = true
			// this.observeDistrict = observe(selectedDistrict, (change) => {
			// 	const buildingData = change.newValue.buildingGrid.getBuilding(
			// 		this.props.x,
			// 		this.props.y
			// 	)
			// 	this.setState({
			// 		buildingData: buildingData,
			// 	})
			// 	this.changeBuildingListObserver(change.newValue)
			// })
			// this.buildingsChangedListener = observe(
			// 	buildingGridStore.district.buildingGrid.buildings,
			// 	(change) => {
			// 		if (this._isMounted) {
			// 			this.setState({
			// 				buildingData: buildingGridStore.district.buildingGrid.getBuilding(
			// 					this.props.x,
			// 					this.props.y
			// 				),
			// 			})
			// 		}
			// 	}
			// )
			//TODO
			// this.changeBuildingListObserver(buildingGridStore.district)
		}
		changeBuildingListObserver = (district) => {
			if (this.observeBuildingList) this.observeBuildingList()

			this.observeBuildingList = observe(
				district.buildingGrid.buildings,
				(buildingChange) => {
					if (this._isMounted) {
						if (buildingChange.addedCount > 0)
							this.setState({
								buildingData: this.state.district.buildingGrid.getBuilding(
									this.props.x,
									this.props.y
								),
							})
						else if (
							buildingChange.removedCount > 0 &&
							this.getBuildingData() &&
							buildingChange.removed.some(
								(v) => v.id === this.getBuildingData().id
							)
						) {
							this.setState({
								buildingData: null,
							})
						}
					}
				}
			)
		}

		canBuild = (hovered, district, mode, upgradeFrom) => {
			for (let i = 0; i < hovered.length; i++) {
				if (mode === GridMode.BUILD) {
					if (
						typeof district.buildingGrid.getBuilding(
							hovered[i].x,
							hovered[i].y
						) !== "undefined"
					)
						return false
				} else if (mode === GridMode.UPGRADE) {
					const hoveredBuildingType = typeof district.buildingGrid.getBuilding(
						hovered[i].x,
						hovered[i].y
					)
					if (
						hoveredBuildingType !== "undefined" &&
						hoveredBuildingType !== typeof upgradeFrom.building
					)
						return false
				}
			}
			return true
		}

		componentWillUnmount() {
			this._isMounted = false
			if (this.observeBuildingList) this.observeBuildingList()
			// this.observeDistrict()
			// this.buildingsChangedListener()
		}

		onSelect =
			(selected, selectedBuilding, rotation, mode, district, upgradingFrom) =>
			(e) => {
				//TODO check if fits
				if (selected) {
					if (
						!this.getBuildingData() &&
						mode === GridMode.BUILD &&
						selectedBuilding
					) {
						if (this.canBuild(selected, district, mode, upgradingFrom))
							district.buildingGrid.addBuilding(
								this.props.x,
								this.props.y,
								selectedBuilding,
								rotation
							)
					} else if (mode === GridMode.DELETE && this.getBuildingData()) {
						district.buildingGrid.removeBuilding(
							this.getBuildingData().x,
							this.getBuildingData().y
						)
					} else if (
						selectedBuilding &&
						mode === GridMode.UPGRADE &&
						(!this.getBuildingData() ||
							this.getBuildingData().building.upgradesFrom ===
								selectedBuilding)
					) {
						if (upgradingFrom) {
							if (this.canBuild(selected, district, mode, upgradingFrom)) {
								district.buildingGrid.removeBuilding()
								district.buildingGrid.addBuilding(
									this.props.x,
									this.props.y,
									selectedBuilding,
									rotation
								)
								this.props.onUpgrade(null, null)
							}
						} else {
							const upgradesTo = BuildingList.getUpgradeFor(
								this.getBuildingData().building
							)
							if (upgradesTo != null) {
								this.props.onUpgrade(this.getBuildingData(), upgradesTo)
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

		getImageData = (
			hoveredSquare,
			selectedBuilding,
			rotation,
			shouldDisplay,
			district
		) => {
			const imageData = { imageIndex: -1, building: null, rotation: 0 }
			const info = {
				buildingX: -1,
				buildingY: -1,
				rotation: -1,
				building: null,
			}
			if (selectedBuilding && shouldDisplay) {
				info.buildingX = hoveredSquare.x
				info.buildingY = hoveredSquare.y
				info.building = selectedBuilding
				info.rotation = rotation
			} else if (this.getBuildingData()) {
				info.buildingX = this.getBuildingData().x
				info.buildingY = this.getBuildingData().y
				info.building = this.getBuildingData().building
				info.rotation = this.getBuildingData().rotation
			}
			if (info.buildingX === -1) return imageData
			imageData.imageIndex =
				((this.props.y - info.buildingY > 0 && info.building.size === 4
					? (this.props.x - info.buildingX + 1) % 2
					: info.building.size === 4
					? this.props.x - info.buildingX
					: this.props.x -
					  info.buildingX +
					  (info.rotation === 1 || info.rotation === 2 ? 1 : 0)) +
					(this.props.y - info.buildingY) * Math.ceil(info.building.size / 2) -
					info.rotation +
					4) %
				info.building.size
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
			if (!this.getBuildingData()||!list||!list[0]) return false
			const buildingUnderCursor = district.buildingGrid.getBuilding(
				list[0].x,
				list[0].y
			)
			return (
				buildingUnderCursor &&
				buildingUnderCursor.id === this.getBuildingData().id
			)
		}

		render() {
			const selected = buildingGridStore.selectedList
			const hovered = buildingGridStore.hoveredList
			const district = buildingGridStore.district
			const shouldDisplay = buildingGridStore.shouldDisplay
			const selectedBuilding = buildingGridStore.selectedBuilding
			const rotation = buildingGridStore.rotation
			const mode = buildingGridStore.mode
			const isSelected =
				this.checkCoords(selected) || this.checkBuilding(selected, district)
			this._isSelected = isSelected
			const isHovered = this.checkCoords(buildingGridStore.hovered)
			const isHoveredFullBuilding = this.checkBuilding(hovered, district)
			const displayBuilding = shouldDisplay[this.props.x][this.props.y]
			const {
				imageIndex,
				building,
				rotation: imageRotation,
			} = this.getImageData(
				hovered[0],
				selectedBuilding,
				rotation,
				displayBuilding,
				district
			)

			const divRef = React.createRef()
			return (
				<>
					<div
						onClick={this.onSelect(
							isSelected,
							selectedBuilding,
							rotation,
							mode,
							district
						)}
						onMouseEnter={this.onHover}
						onMouseLeave={this.onMouseLeave}
						ref={divRef}
						className={
							"buildingGridBuildingsGridSquare " +
							(isSelected ? "buildingGridBuildingsGridSquare_selected " : "") +
							(isHovered || isHoveredFullBuilding
								? "buildingGridBuildingsGridSquare_hovered "
								: "") +
							(isHovered &&
							selectedBuilding &&
							(((mode === GridMode.BUILD || mode === GridMode.UPGRADE) &&
								typeof district.buildingGrid.getBuilding(
									this.props.x,
									this.props.y
								)) !== "undefined" ||
								(mode === GridMode.UPGRADE &&
									district.buildingGrid.getBuilding(this.props.x, this.props.y)
										.building === selectedBuilding))
								? "buildingGridBuildingsGridSquare_incorrect "
								: "")
						}
					>
						{imageIndex >= 0 ? (
							<img
								style={{
									transform: `rotate(${imageRotation * 90}deg)`,
								}}
								src={building.image[imageIndex]}
								alt={""}
							/>
						) : (
							""
						)}
					</div>
					{isHovered && mode === GridMode.DISPLAY && this.getBuildingData() ? (
						<BuildingHoverTooltip
							building={this.getBuildingData().building}
							hoverObject={divRef}
						/>
					) : (
						""
					)}
				</>
			)
		}
	}
)

class BuildingGridBuildings extends Component {
	constructor(props) {
		super(props)
		buildingGridStore.district = props.district
		buildingGridStore.shouldDisplay = this.getShouldDisplay()
		this.store=buildingGridStore
		
	}

	componentDidMount = () => {
		this._isMounted = true
		this.buildingsChangedListener = observe(
			buildingGridStore.district.buildingGrid.buildings,
			(change) => {
				if (this._isMounted) {
					this.forceUpdate()
				}
			}
		)
		this.changeShouldDisplay = reaction(
			() => {
				return {
					hovered: buildingGridStore.hovered,
					selected: buildingGridStore.selected,
				}
			},
			() => {
				buildingGridStore.shouldDisplay = this.getShouldDisplay()
				buildingGridStore.hoveredList=this.getHighlightList("hovered")
				buildingGridStore.selectedList=this.getHighlightList("selected")
			}
		)
	}
	componentWillUnmount = () => {
		this._isMounted = false
		this.buildingsChangedListener()
	}

	changeRotation = action("buildingGridRotation", (event) => {
		const change = event.deltaY > 0 ? 1 : -1
		let newRotation = buildingGridStore.rotation + change
		while (newRotation < 0) newRotation += 4
		while (newRotation > 3) {
			newRotation -= 4
		}

		buildingGridStore.rotation = newRotation
	})

	getPos = (i, j) => {
		return i * 2 + (j < 2 ? j : j + 4) + Math.floor(i / 3) * 6
	}

	onSquareHover = action("buildingGridSquareHover", (x, y) => {
		buildingGridStore.hovered = { x: x, y: y }
	})
	onSquareSelect = action("buildingGridSquareSelect", (x, y) => {
		buildingGridStore.selected = { x: x, y: y }
	})
	startUpgrade = (buildingData, building) => {
		//TODO
	}

	shouldBuildingDisplay = (x, y) => {
		if (!buildingGridStore.selectedBuilding) return false
		const b = buildingGridStore.selectedBuilding
		const br = buildingGridStore.rotation
		const { x: bx, y: by } = buildingGridStore.hovered
		return (
			(x === bx && y === by) ||
			(x === bx + 1 &&
				y === by &&
				(b.size === 4 || (b.size === 2 && br % 2 === 0))) ||
			(x === bx &&
				y === by + 1 &&
				(b.size === 4 || (b.size === 2 && br % 2 === 1))) ||
			(x === bx + 1 && y === by + 1 && b.size === 4)
		)
	}

	isWrong = (x, y) => {
		if (!this.props.selectedBuilding) return false
		const buildingHere = buildingGridStore.district.buildingGrid.getBuilding(
			x,
			y
		)
		return typeof buildingHere !== "undefined"
	}
	buildingGridSquares = [...Array(9).keys()].map((i) => {
		return (
			<div key={i} className={"buildingGridBuildingsGridInner"}>
				{[...Array(4).keys()]
					.map((j) => {
						return this.getPos(i, j)
					})
					.map((pos) => {
						return { x: pos % 6, y: Math.floor(pos / 6), pos: pos }
					})
					.map(({ x, y, pos }) => {
						return (
							<BuildingGridSquare
								key={pos}
								x={x}
								y={y}
								onHover={this.onSquareHover}
								onSelect={this.onSquareSelect}
								onUpgrade={this.startUpgrade}
							/>
						)
					})}
			</div>
		)
	})

	getHighlightList = (value) => {
		const out = [{ ...buildingGridStore[value] }]

		if (this.props.selectedBuilding) {
			if (this.props.selectedBuilding.size === 2) {
				out.push({
					x: buildingGridStore[value].x + ((buildingGridStore.rotation + 1) % 2),
					y: buildingGridStore[value].y + (buildingGridStore.rotation % 2),
				})
			} else if (this.props.selectedBuilding.size === 4) {
				for (let i = 1; i < 4; i++) {
					out.push({
						x: buildingGridStore[value].x + (i % 2),
						y: buildingGridStore[value].y + Math.floor(i / 2),
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
				out[x][y] =
					buildingGridStore.mode === GridMode.BUILD ||
					buildingGridStore.mode === GridMode.UPGRADE
						? this.shouldBuildingDisplay(x, y)
						: false
			}
		}
		return out
	}

	selectMode = (mode) =>
		action("buildingGridSelectMode", (e) => {
			if (mode !== GridMode.BUILD) this.props.deselectBuilding()
			buildingGridStore.mode = mode
		})

	render() {
		return (
			<div className={"buildingGridBuildings"} onWheel={this.changeRotation}>
				<div className={"buildingGridBuildingsMode"}>
					{Object.keys(gridModeIcons).map((value, index) => {
						return (
							<div
								key={index}
								className={
									"buildingGridBuildingsModeIcon " +
									(buildingGridStore.mode === GridMode[value]
										? "buildingGridBuildingsModeIcon_selected"
										: "")
								}
								onClick={this.selectMode(GridMode[value])}
							>
								<img src={gridModeIcons[value]} alt={value} />
							</div>
						)
					})}
				</div>
				<div className={"buildingGridBuildingsGrid"}>
					{this.buildingGridSquares}
				</div>
			</div>
		)
	}
}

export default observer(BuildingGridBuildings)
export {buildingGridStore}