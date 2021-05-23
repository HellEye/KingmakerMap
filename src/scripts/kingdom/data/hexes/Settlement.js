import { observable, makeObservable, action } from "mobx"
import dbLoader from "../../../utils/dbLoader"
import { BuildingList } from "../buildings/buildings"
import { computedFn } from "mobx-utils"
import { buildingReducer } from "./buildingReducer"
import { District } from "./District"
import fieldChangeObserver, { fieldChanged } from "./fieldChangeObserver"
import dotNotation from "mongo-dot-notation"
import socketHandler from "../../../utils/socketHandler"
import socketDataReplacer from "../../../utils/socketDataReplacer"
export class Settlement {
	id = 0
	hex = 0
	districts = []
	settlementImprovements = []
	discounts = []
	name = "Unnamed settlement"
	deleted = false

	constructor(obj, hex) {
		this.hex = hex
		this.loaded=false
		if (obj) {
			this.id = obj._id
			this.name = obj.name
			// if (obj.districts)
			// 	this.districts = obj.districts.map((v) => new District(v, this))
			if (obj.settlementImprovements)
				this.settlementImprovements = obj.settlementImprovements.map((v) =>
					BuildingList.getById(v)
				)

			if (obj.discounts)
				this.discounts = obj.discounts.map((d) => BuildingList.getById(d))
		}

		makeObservable(this, {
			districts: observable.shallow,
			discounts:observable.shallow,
			name: observable,
			settlementImprovements: observable.shallow,
		})

		const callbacks = {
			onLoaded: this._onLoaded,
			onDelete: this._onDelete,
			onInsert: this._onInsert,
			clearAll: this._clearAll,
			onUpdate: this._onUpdate,
		}
		socketDataReplacer.watch("districts", callbacks, {
			hexId:this.hex.id
		})
	}

	_clearAll = action(() => {
		this.districts.clear()
	})

	_onInsert = (obj) => {
		this.createNewDistrict(obj)
	}
	_onDelete = action("onDeleteDistrict", (id) => {
		let index = this.districts.findIndex((v) => v.id === id)
		if (index!==-1) this.districts.splice(index, 1)
	})
	_onLoaded = () => {
		//TODO load??
		this.loaded = true
	}

	_onUpdate = (obj) => {
		console.log("onUpdate districts test", obj)
		if(this.hex.id!==obj.hexId) return
		const index = this.districts.findIndex((v) => v.id === obj._id)
		if (index >= 0) this.districts[index].update(obj)
		else this.createNewDistrict(obj)
	}

	fieldChanged = (fieldName) => {
		const findObj = this.getFindPath()
		const newObj = {}
		newObj.settlement={}
		switch (fieldName) {
			case "name":
				case "settlementImprovements":
				newObj.settlement[fieldName]=this[fieldName]
				break
			case "discounts":
				newObj.settlement[fieldName] = this[fieldName].map(v=>v.id)
				break
			default:
				if (fieldName) {
					newObj[fieldName] = this[fieldName]
				}
		}
		socketHandler.emit("update", {
			collection: "hexes",
			findObj: findObj,
			newObj: dotNotation.flatten(newObj),
		})
	}
	getFindPath = () => {
		return this.hex.getFindPath()
	}
	addDiscountsFor = (buildings) => {
		console.log(buildings)
		buildings.forEach(v=>this.discounts.push(BuildingList.getByType(v)))
		this.fieldChanged("discounts")
	}
	applyDiscountFor = (building) => {
		const index = this.discounts.findIndex((d) => d?.building?.id === building.id)
		if (index < 0) return false
		this.discounts.splice(index, 1)
		this.fieldChanged("discounts")
		return true
	}
	hasDiscountFor=(building)=>{
		return this.discounts.findIndex(v=>v.id===building.id)>=0
	}

	createNewDistrict = action("createNewDistrict", (obj)=>{
		if(obj.hexId!==this.hex.id) return
		const newDistrict = new District(obj, this)
		this.districts.push(newDistrict)
		return newDistrict
	})

	addDistrict = () => {
		socketHandler.emit("insert", {
			collection:"districts", 
			newObj:new District(null, this).toNewObjectJson()
		})
	}

	toFormData = () => {
		const formData = new FormData()
		formData.append("name", this.name.replace("'", "''"))
		formData.append("hex", this.hex.id.toString())
		return formData
	}

	deleteDistrict =  action("deleteDistrict", (id) => {
		const index = this.getDistrictIndexById(id)
		if (index < 0) return
		socketHandler.emit("delete", { 
			collection:"districts",
			findObj:{_id:id}
		})
	})

	setName = action("setDistrictName",(name) => {
		this.name = name
		this.fieldChanged("name")
	})
	addImprovement = action("addSettlementImprovement", (building) => {
		if (!building) return false
		const discount = this.applyDiscountFor(building)
		const kingdomData = this.hex?.ownedBy?.kingdomData
		const price = discount ? Math.ceil(building.bpCost / 2) : building.bpCost
		if (kingdomData && this.hex.ownedBy.kingdomData.data.treasury < price) return false
		
		this.settlementImprovements.push(building.id)
		if(kingdomData)
			kingdomData.data.treasury -= price
		this.fieldChanged("settlementImprovements")
	})

	removeImprovement = action("removeSettlementImprovement", (building) => {
		const index = this.settlementImprovements.findIndex(
			(b) => b.building.id === building.id
		)
		if (index >= 0) {
			this.settlementImprovements.splice(index, 1)
			this.fieldChanged("settlementImprovements")
		}
	})
	getDistrictIndexById = (id) => {
		return this.districts.findIndex((value) => value.id === id)
	}
	getDistrictByID = (id) => {
		const index = this.getDistrictByID(id)
		if (index > 0) return this.districts[index]
		return null
	}

	hasImprovement = computedFn((building) => {
		return this.settlementImprovements.some((v) => v.building === building.id)
	})

	getSettlementModifiers(acc) {
		if (this.districts)
			this.districts.reduce((acc, d) => {
				return d.getDistrictModifiers(acc)
			}, acc)
		if (this.settlementImprovements)
			this.settlementImprovements.reduce(buildingReducer, acc)
		return acc
	}

	update = action("updateSettlement", (obj) => {
		if(obj.name){
			this.name=obj.name
		}

		if (obj.settlementImprovements) {
			this.settlementImprovements.clear()
			this.settlementImprovements.push(obj.settlementImprovements.map((v) =>
				BuildingList.getById(v)
			))
		}
		if (obj.discounts) {
			this.discounts.clear()
			this.discounts.push(obj.discounts.map((d) => BuildingList.getById(d)))
		}
		// if (obj.districts) {
		// 	const distr = this.districts.find((d) => d.id === obj.districts[0]._id)
		// 	if (distr) {
		// 		distr.updateBuildings(obj.districts[0].buildings)
		// 	} else this.districts.push(new District(obj.districts[0], this))
		// }
	})

	updateDiscounts = (id, obj) => {
		const index = this.discounts.findIndex((v) => v.id === id)
		if (!obj && index >= 0) {
			this.discounts.splice(index, 1)
		} else if (obj && index < 0 && obj.settlement === this.id) {
			this.discounts.push({
				id: obj._id,
				building: BuildingList.getById(obj.building),
			})
		}
	}
	updateDistricts = action("updateDistrictsInSettlement", (id, obj) => {
		const index = this.districts.findIndex((v) => v.id === id)
		if (!obj && index >= 0) {
			this.districts.splice(index, 1)
		} else if (obj && index < 0 && obj.settlement === this.id) {
			this.districts.push(new District(obj, this))
		} else if (obj && index >= 0) {
			this.districts.update(obj)
		}
	})
	updateBuildings = action("updateBuildingsInSettlement", (id, obj) => {
		this.districts.forEach((v) => v.updateBuildings(id, obj))
	})
	updateSettlementImprovements = action("updateSettlementImprovements", (id, obj) => {
		const index = this.settlementImprovements.findIndex(
			(v) => v.id === id || v.id === -1
		)
		if (!obj && index >= 0) {
			this.settlementImprovements.splice(index, 1)
		} else if (obj && index < 0 && this.id === obj.settlement) {
			this.settlementImprovements.push({
				id: id,
				building: BuildingList.getById(obj.building),
			})
		}
	})
}
