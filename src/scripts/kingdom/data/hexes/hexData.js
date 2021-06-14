import { observable, makeObservable, when, action } from "mobx"
import { kingdoms } from "../kingdoms"
import hexDataGrid from "../hexes/HexDataGrid"
import { ImprovementList } from "../hexImprovements/ImprovmentsMilo"
import { TerrainList } from "../hexImprovements/TerrainMilo"
import socketHandler from "../../../utils/socketHandler"
import { Settlement } from "./Settlement"
import { improvementReducer } from "./improvementReducer"
import dotNotation from "mongo-dot-notation" 
class HexData {
	id = 0
	x = 0
	y = 0
	ownedBy = null
	label = ""
	terrainType = null
	settlement = null
	hexImprovements = []

	constructor(obj) {
		this.id = obj._id
		this.x = obj.x
		this.y = obj.y
		this.terrainType = TerrainList.getById(obj.terrainType)
		this.settlement =
			obj.settlement && Object.keys(obj.settlement).length > 0
				? new Settlement(obj.settlement, this)
				: null

		this.label = obj.label ? obj.label.replace(/↓/g, "\n") : ""

		if (obj.hexImprovements) {
			this.hexImprovements = obj.hexImprovements.map(v=>ImprovementList.getById(v))
		}
		when(
			() => kingdoms.finishedLoading,
			() => {
				this.ownedBy = kingdoms.getById(obj.ownedBy)
			}
		)

		makeObservable(this, {
			ownedBy: observable,
			terrainType: observable,
			label: observable,
			settlement: observable,
			hexImprovements: observable,
		})

		//fieldChangeObserver(this, this.fieldChanged, "label", "terrainType", "ownedBy", "hexImprovements")
	}

	// saveToDb = ()=>{
	// 	const findObj = {
	// 		_id:this.id
	// 	}
	// 	const newObj={
	// 		_id:this.id,
	// 		x:this.x, y: this.y,
	// 		ownedBy:this.ownedBy.id,
	// 		label:this.label,
	// 		terrainType:this.terrainType,
	// 		hexImprovements:this.hexImprovements.map(o=>{return {_id:o.id, improvement:o.improvement.id}}),
	// 		settlement:this.settlement?.getJson()
	// 	}
	// }

	getFindPath = () =>{
		if(!this.id) return {
			x:this.x, y:this.y
		}
		return { 
			_id: this.id
		}
	}
	fieldChanged = (fieldName) => {
		const findObj = this.getFindPath()
		hexDataGrid.saveHexIfEmpty(this)
		const newObj = {}
		switch (fieldName) {
			case "terrainType":
			case "ownedBy":
				newObj[fieldName] = this[fieldName].id
				break
			case "hexImprovements":
				newObj["hexImprovements"] = this.hexImprovements.map((v) => v.id)
				break
			default:
				if (fieldName) {
					newObj[fieldName] = this[fieldName]
				}
		}
		socketHandler.emit("update", {
			collection: 'hexes',
			findObj: findObj,
			newObj: dotNotation.flatten(newObj),
		})
	}

	toJson = () => {
		return { 
			x:this.x,
			y:this.y,
			ownedBy: this.ownedBy,
			terrainType:this.terrainType,
		}
	}
	hasImprovement = (improvement) => {
		const index = this.hexImprovements.findIndex(
			(value) => value.id === improvement.id
		)
		return index >= 0
	}

	addImprovement = (improvement, cost) => {
		//XXX
		// if (!this.ownedBy) return false
		// if (!improvement) return false
		// if (this.ownedBy.kingdomData.data.treasury < cost) return false

		// this.ownedBy.kingdomData.data.treasury -= cost

		this.hexImprovements.push(improvement)
		this.fieldChanged("hexImprovements")
		return true
	}

	removeImprovement = (improvement) => {
		if (!improvement) return
		const index = this.hexImprovements.findIndex(
			(value) => value.id === improvement.id
		)
		this.hexImprovements.splice(index, 1)
		this.fieldChanged("hexImprovements")
	}

	setTerrain = (terrain) => {
		this.terrainType = terrain
		this.fieldChanged("terrainType")
	}

	setLabel = (label) => {
		this.label = label
		this.fieldChanged("label")
	}

	setOwnedBy = action("hexSetOwnedBy", (kingdom)=>{
		this.ownedBy=kingdom
		this.fieldChanged("ownedBy")
	})

	createSettlement = action("createNewSettlement",() => {
		hexDataGrid.saveHexIfEmpty(this)
		if (!this.settlement) {
			this.settlement = new Settlement(null, this)
			socketHandler.emit("update", {
				collection: 'hexes',
				findObj: this.getFindPath(),
				newObj: {$set:{settlement:this.settlement.toJson()}},
			})
		}
	})

	update = action((obj) => {
		console.log("update hex obj", obj)
		if(!this.id && obj._id)
			this.id=obj._id
		this.ownedBy = kingdoms.getById(obj?.ownedBy) || this.ownedBy
		this.terrainType = TerrainList.getById(obj?.terrainType) || this.terrainType
		this.label = obj?.label || this.label

		if (obj.hexImprovements) {
			this.hexImprovements = obj.hexImprovements.map((v) =>
				ImprovementList.getById(v)
			)
		}
		if (obj.settlement) {
			if (this.settlement) this.settlement.update(obj.settlement)
			else this.settlement = new Settlement(obj.settlement, this)
		}
	})

	// updateSettlement = (id, obj) => {
	// 	if (obj && this.settlement && this.settlement.id === id) {
	// 		this.settlement.update(obj)
	// 	} else if (!obj && this.settlement && this.settlement.id === id) {
	// 		this.settlement = null
	// 	} else if (obj && !this.settlement && obj.hex === this.id) {
	// 		this.settlement = new Settlement(obj, this)
	// 	}
	// }
	// updateImprovements = (id, obj) => {
	// 	const index = this.hexImprovements.findIndex(
	// 		(v) => v.id === id || v.id === -1
	// 	)
	// 	console.log("index, id", index, id)
	// 	if (index >= 0) {
	// 		console.log(obj)
	// 	}
	// 	if (obj && index < 0 && obj.hex === this.id) {
	// 		this.hexImprovements.push({
	// 			id: id,
	// 			improvement: ImprovementList.getById(obj.improvement)
	// 		})
	// 		console.log("ADD", this.hexImprovements)
	// 	} else if (!obj && index >= 0) {
	// 		this.hexImprovements.splice(index, 1)
	// 		console.log("REMOVE", this.hexImprovements)
	// 	}
	// }
	// updateDiscounts = (id, obj) => {
	// 	if (this.settlement) this.settlement.updateDiscounts(id, obj)
	// }
	// updateDistricts = (id, obj) => {
	// 	if (this.settlement) this.settlement.updateDistricts(id, obj)
	// }
	// updateBuildings = (id, obj) => {
	// 	if (this.settlement) this.settlement.updateBuildings(id, obj)
	// }
	// updateSettlementImprovements = (id, obj) => {
	// 	if (this.settlement) this.settlement.updateSettlementImprovements(id, obj)
	// }
	// toFormData = () => {
	// 	const formData = new FormData()
	// 	formData.append("xcoord", this.x.toString())
	// 	formData.append("ycoord", this.y.toString())
	// 	formData.append(
	// 		"owned_by",
	// 		this.ownedBy != null && this.ownedBy.id != null
	// 			? this.ownedBy.id.toString()
	// 			: 0
	// 	)
	// 	formData.append(
	// 		"terrain_type",
	// 		this.terrainType ? this.terrainType.id.toString() : "0"
	// 	)
	// 	formData.append("label", this.label.replace(/'/g, "''").replace(/\n/g, "↓"))
	// 	return formData
	// }
	// loadFromDb = () => {
	// 	dbLoader(`hex/${this.id}`, "GET").then((data) => {
	// 		this.ownedBy = kingdoms.getById(data.ownedBy)
	// 		this.terrainType = TerrainList.getById(data.terrainType)
	// 	})
	// }

	getSettlementModifiers = (acc) => {
		if (this.settlement != null)
			acc = this.settlement.getSettlementModifiers(acc)
		if (this.hexImprovements.length > 0) {
			this.hexImprovements.reduce(improvementReducer, acc)
		}
		return acc
	}
}

/**TODO
 		Idea on updates 
		when sending objects, append name of top class to the front before returning further, then send update from the top
		e.g. for district:
		district findObj: "id, district"
		settlement findObj: {id, name, "settlement." + [...findObj]}
		hexData findObj: {id, "hexData"+[...findObj]}
		might be an easy way to convert to dot notation

		on receiving updated object:
		cascade through update with fields, just check for undefined everywhere in guard clause

		server side to return partial object:
		field=findObj.split('.')
		let obj={}
		let value=newValue
		for f in field (in reverse -1) {
			obj.f:value
			value=obj
			obj={}
		}
		or something (create innermost object first and then add that as a value to the right field)
 */

export { HexData }
