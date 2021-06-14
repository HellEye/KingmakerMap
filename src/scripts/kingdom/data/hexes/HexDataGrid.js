import { observable, makeObservable, action } from "mobx"
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

	_clearAll = action("onClearHexGrid",() => {
		this.hexGrid.clear()
	})
	_onInsert = (obj) => {
		this.createNewHex(obj)
	}
	_onDelete = action("onDeleteHex",(id) => {
		let index = this.hexGrid.findIndex((v) => v.id === id)
		if (index) this.hexGrid.splice(index, 1)
	})
	_onLoaded = action("onHexGridLoaded",() => {
		this.loaded = true
	})

	_onUpdate = (obj) => {
		const index = this.hexGrid.findIndex((v) => v.id?v.id === obj._id:(v.x===obj.x && v.y===obj.y))
		if (index >= 0) this.hexGrid[index].update(obj)
		else this.createNewHex(obj)
	}

	
	saveHexIfEmpty = (hex)=>{
		if(hex.id) return
		socketHandler.emit("update", {
			collection: "hexes",
			findObj: {x:hex.x,y:hex.y},
			newObj:hex.toJson()
		})

	}

	createNewHex = action("createNewHex",(obj) => {
		const newHex = new HexData(obj)
		this.hexGrid.push(newHex)
		return newHex
	})

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
		if(!this.loaded) return []
		const out= this.hexGrid.filter(
			(value) => value.ownedBy && (value.ownedBy.id === id)
		)
		return out
	})

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
				if (imprAcc[improvement.name]) {
					imprAcc[improvement.name].count++
				} else {
					imprAcc[improvement.name] = {
						building: improvement,
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
