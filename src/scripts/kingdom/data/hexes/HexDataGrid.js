import { observable, makeObservable } from "mobx"
import { computedFn } from "mobx-utils"
import socketHandler from "../../../utils/socketHandler"
import socketDataReplacer from "../../../utils/socketDataReplacer"
import { HexData } from "./hexData"
import { Accumulator } from "./Accumulator"
import makeInspectable from "mobx-devtools-mst"

class HexDataGrid {
	hexGrid = observable([])
	selected = -1
	socket = socketHandler
	constructor() {
		this.loaded = false
		makeObservable(this, {
			loaded: observable,
			selected: observable,
		})
		const callbacks = {
			onLoaded: this._onLoaded,
			onDelete: this._onDelete,
			onInsert: this._onInsert,
			clearAll: this._clearAll,
			onUpdate: this._onUpdate,
		}
		socketDataReplacer.watch("hexes", callbacks)
	}

	_clearAll = () => {
		this.hexGrid.clear()
	}
	_onInsert = (obj) => {
		this.createNewHex(obj)
	}
	_onDelete = (id) => {
		let index = this.hexGrid.findIndex((v) => v.id === id)
		if (index) this.hexGrid.splice(index, 1)
	}
	_onLoaded = () => {
		this.loaded = true
	}

	_onUpdate = (obj) => {
		console.log("onUpdate hex test", obj)
		const index = this.hexGrid.findIndex((v) => v.id === obj._id)
		if (index >= 0) this.hexGrid[index].update(obj)
		else this.createNewHex(obj)
	}

	createNewHex = (obj) => {
		const newHex = new HexData(obj)
		this.hexGrid.push(newHex)
		return newHex
	}

	getById = (id) => {
		return this.hexGrid.find((hex) => hex.id === id)
	}

	getByCoords = (x, y) => {
		return (
			this.hexGrid.find((v) => v.x === x && v.y === y) ||
			new HexData({
				id: 0,
				x: x,
				y: y,
				ownedBy: -1,
				terrainType: -1,
			})
		)
	}

	getByKingdom = computedFn((id) => {
		// const out = []
		return this.hexGrid.filter(
			(value) => value.ownedBy && value.ownedBy.id === id
		)
	}, true)

	getModifiersByKingdomId = (id) => {
		if (id <= 0) return new Accumulator()
		const acc = new Accumulator()
		this.getByKingdom(id).forEach((value) => {
			value.getSettlementModifiers(acc)
		})
		return acc
	}

	getBuildingCountByKingdomId = computedFn((id) => {
		if (id <= 0) return {}
		const acc = {}
		return this.getByKingdom(id).reduce((hexAcc, hex) => {
			let acc = hexAcc
			acc = hex.hexImprovements.reduce((imprAcc, improvement) => {
				if (imprAcc[improvement.improvement.name]) {
					imprAcc[improvement.improvement.name].count++
				} else {
					imprAcc[improvement.improvement.name] = {
						building: improvement.improvement,
						count: 1,
					}
				}
				return imprAcc
			}, hexAcc)
			if (hex.settlement) {
				acc = hex.settlement.districts.reduce((districtAcc, district) => {
					return district.buildingGrid.buildings.reduce(
						(buildingAcc, building) => {
							if (buildingAcc[building.building.name]) {
								buildingAcc[building.building.name].count++
							} else {
								buildingAcc[building.building.name] = {
									building: building.building,
									count: 1,
								}
							}
							return buildingAcc
						},
						districtAcc
					)
				}, hexAcc)
				return hex.settlement.settlementImprovements.reduce(
					(imprAcc, improvement) => {
						if (imprAcc[improvement.building.name]) {
							imprAcc[improvement.building.name].count++
						} else {
							imprAcc[improvement.building.name] = {
								building: improvement.building,
								count: 1,
							}
						}
						return imprAcc
					},
					acc
				)
			} else return acc
		}, acc)
	}, true)
}
const hexDataGrid = new HexDataGrid()

export default hexDataGrid

// socketHandler.emit("find", { collection: "hexes", findObj: {} })
makeInspectable(hexDataGrid)
