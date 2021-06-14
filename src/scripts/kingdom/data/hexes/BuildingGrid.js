import { observable, makeObservable } from "mobx"
import dbLoader from "../../../utils/dbLoader"
import { buildingReducer } from "./buildingReducer"
import { BuildingDetails } from "./BuildingDetails"
import socketHandler from "../../../utils/socketHandler"

export class BuildingGrid {
	buildings = []
	district = null

	constructor(obj, district) {
		this.district = district
		if(obj)
			this.buildings.push(...obj?.map((v) => new BuildingDetails(v)))
		makeObservable(this, {
			buildings: observable.shallow,
		})

	}
	getFindPath = () => {
		return this.district.getFindPath()
	}

	fieldChanged = (fieldName)=>{
		const findObj = this.getFindPath()
		const newObj = {}
		switch (fieldName) {
			case "buildings":
				newObj[fieldName] = this[fieldName].map(b=>b.toJson())
				break
			default:
				if (fieldName) {
					newObj[fieldName] = this[fieldName]
				}
		}
		socketHandler.emit("update", {
			collection: "districts",
			findObj: findObj,
			newObj: newObj,
		})
	}

	addBuilding = (x, y, building, rotation) => {
		if (!building || x < 0 || y < 0) return
		const kingdomData = this.district?.settlement?.hex?.ownedBy?.kingdomData
		const discount = this.district.settlement.hasDiscountFor(building)
		const price = discount ? Math.ceil(building.bpCost / 2) : building.bpCost
		if (kingdomData && kingdomData.data.treasury < price) return
		this.district.settlement.applyDiscountFor(building)
		const newBuilding = new BuildingDetails(
			{ id: -1, building: building.id, x: x, y: y, rotation: rotation },
			this
		)
		
		this.buildings.push(newBuilding)

		this.district.settlement.addDiscountsFor(building.discounts)
		if(kingdomData)
			kingdomData.data.treasury -= price
		this.fieldChanged("buildings")
	}
	upgradeBuilding = (x, y, building) => {
		//TODO !!! upgrades
	}
	removeBuilding = (x, y) => {
		const index = this.buildings.findIndex((b) => b.x === x && b.y === y)
		if (index < 0) return
		dbLoader(`district/buildings/${this.district.id}/${x}-${y}`, "DELETE")
		this.buildings.splice(index, 1)
	}
	getBuildingGridModifiers(accumulator) {
		if (this.buildings)
			return this.buildings
				.map((v) => v.building)
				.reduce(buildingReducer, accumulator)
		return accumulator
	}
	getBuilding = (x, y) => {
		if (x < 0 || x > 5 || y < 0 || y > 5) return null
		return this.buildings.find(
			({ x: bx, y: by, rotation: br, building: b }) =>
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

	update = (obj) => {
		this.buildings.clear()
		this.buildings.push(...obj.map((v) => new BuildingDetails(v, this)))
	}

	updateBuildings = (obj) => {
		this.buildings.clear()
		this.buildings.push(...obj.map((v) => new BuildingDetails(v, this)))
		/* 
		const index = this.buildings.findIndex((v) => v.id === id || v.id === -1);
		if (!obj && index >= 0) {
			this.buildings.splice(index, 1);
		} else if (obj && index < 0 && obj.district === this.district.id) {
			this.buildings.push(new BuildingDetails(obj, this));
		} */
	}
}
