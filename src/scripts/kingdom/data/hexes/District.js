import { BuildingGrid } from "./BuildingGrid"
import { observable, makeObservable } from "mobx"
import fieldChangeObserver from "./fieldChangeObserver"
import dotNotation from "mongo-dot-notation"
import socketHandler from "../../../utils/socketHandler"
const DBNAME = "$[]"
export class District {
	id = 0
	name = 0
	settlement = null
	buildingGrid = null

	constructor(obj, settlement) {
		this.id = obj?._id
		this.settlement = settlement
		this.name = obj?.name || `New District`
		this.buildingGrid = new BuildingGrid(obj?.buildings, this)

		makeObservable(this, {
			buildingGrid: observable,
			name: observable,
		})
		fieldChangeObserver(this, settlement, DBNAME)
	}

	getFindPath = () => {
		return {
			_id: this.id,
		}
	}

	fieldChanged = (fieldName) => {
		const findObj = this.getFindPath()
		const newObj = {}
		switch (fieldName) {
			case "name":
				newObj[fieldName] = this[fieldName]
				break
			default:
				if (fieldName) {
					newObj[fieldName] = this[fieldName]
				}
		}
		socketHandler.emit("update", {
			collection: "districts",
			findObj: findObj,
			newObj: dotNotation.flatten(newObj),
		})
	}

	getDistrictModifiers(accumulator) {
		if (this.buildingGrid != null)
			return this.buildingGrid.getBuildingGridModifiers(accumulator)
		return accumulator
	}

	setName = (name) => {
		this.name = name
		this.fieldChanged("name")
	}

	update = (obj) => {
		this.buildingGrid.update(obj.buildings)
	}

	updateBuildings = (obj) => {
		if (this.buildingGrid) this.buildingGrid.updateBuildings(obj)
	}

	toNewObjectJson = () => {
		return {
			name: this.name,
			hexId: this.settlement.hex.id,
			buildings: this.buildingGrid.buildings.map((v) => {
				return {
					x: v.x,
					y: v.y,
					building: v.building,
					rotation: v.rotation,
				}
			}),
		}
	}
}
