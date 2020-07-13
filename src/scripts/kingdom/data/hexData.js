import {decorate, observable, observe} from "mobx"import dbLoader from "../../utils/dbLoader"import {kingdoms, selectedKingdom} from "./kingdoms"import {BuildingList} from "./buildings/buildings"import {ImprovementList} from "./hexImprovements/ImprovmentsMilo"import {TerrainList} from "./hexImprovements/TerrainMilo"import {computedFn, keepAlive} from "mobx-utils"class Accumulator {	economy = 0	stability = 0	loyalty = 0	defense = 0	unrest = 0	fame = 0	consumption=0	bp=0}function buildingReducer(acc, {building}) {	acc.economy += building.bonus.economy	acc.stability += building.bonus.stability	acc.loyalty += building.bonus.loyalty	acc.defense += building.bonus.defense	acc.unrest += building.bonus.unrest	acc.fame += building.bonus.fame	return acc}function improvementReducer(acc, {building}) {	acc.economy += building.bonus.economy	acc.stability += building.bonus.stability	acc.loyalty += building.bonus.loyalty	acc.unrest += building.bonus.unrest	acc.consumption+=building.bonus.consumption	acc.bp+=building.bonus.bp	return acc}class BuildingDetails {	id = 0	building = null	x = 0	y = 0	rotation = 0	buildingGrid = null	constructor(obj, grid) {		this.id = obj.id		this.building = BuildingList.getById(obj.building)		this.x = obj.x		this.y = obj.y		this.rotation = obj.rotation		this.buildingGrid = grid	}	toFormData = () => {		const formData = new FormData()		formData.append("building", this.building.id.toString())		formData.append("xcoord", this.x.toString())		formData.append("ycoord", this.y.toString())		formData.append("rotation", this.rotation.toString())		formData.append("district", this.buildingGrid.district.id.toString())		return formData	}}class BuildingGrid {	buildings = []	district = null	constructor(obj, district) {		if (obj != null)			obj.forEach((b) => {				this.buildings.push(new BuildingDetails(b, this))			})		this.district = district	}	addBuilding = (x, y, building, rotation) => {		if (!building || x < 0 || y < 0) return		if (selectedKingdom.get().kingdomData.data.treasury < building.bpCost) return		const newBuilding = new BuildingDetails({building: building.id, x: x, y: y, rotation: rotation}, this)		dbLoader("district/buildings", "PUT", newBuilding.toFormData())			.then((b) => newBuilding.id = b.id)		this.buildings.push(newBuilding)		let buildingCost = building.bpCost		for (let i = 0; i < building.discountedBy.length; i++) {			if (this.district.settlement.applyDiscountFor(building)) {				buildingCost = Math.ceil(buildingCost / 2)				break;			}		}		building.discounts.forEach(value => {			this.district.settlement.addDiscountFor(BuildingList.getByType(value))		})		selectedKingdom.get().kingdomData.data.treasury -= buildingCost		selectedKingdom.get().kingdomData.saveToDb()	}	upgradeBuilding = (x, y, building) => {	}	removeBuilding = (x, y) => {		const index = this.buildings.findIndex(b => b.x === x && b.y === y)		console.log(index)		if (index < 0) return		dbLoader(`district/buildings/${this.district.id}/${x}-${y}`, "DELETE")		this.buildings.splice(index, 1)	}	getBuildingGridModifiers(accumulator) {		if (this.buildings.length > 0)			return this.buildings.reduce(buildingReducer, accumulator)		return accumulator	}	getBuilding = (x, y) => {		if (x < 0 || x > 5 || y < 0 || y > 5) return null		return this.buildings.find(({x: bx, y: by, rotation: br, building: b}) =>			(x === bx && y === by)			|| (x === bx + 1 && y === by && (b.size === 4 || (b.size === 2 && br % 2 === 0)))			|| (x === bx && y === by + 1 && (b.size === 4 || (b.size === 2 && br % 2 === 1)))			|| (x === bx + 1 && y === by + 1 && b.size === 4))	}}decorate(BuildingGrid, {	buildings: observable.shallow,})class District {	id = 0	settlement = null	buildingGrid = null	constructor(obj, settlement) {		this.settlement = settlement		if (obj == null) {			this.buildingGrid = new BuildingGrid(null, this)		} else {			this.id = obj.id			this.buildingGrid = new BuildingGrid(obj.buildings, this)		}	}	saveDistrict = () => {		// TODO terribly broken		return dbLoader(`district/${this.id}`, "POST", this.toFormData())	}	toFormData = () => {		const formData = new FormData()		formData.append("settlement", this.settlement.id.toString())		return formData	}	getDistrictModifiers(accumulator) {		if (this.buildingGrid != null)			return this.buildingGrid.getBuildingGridModifiers(accumulator)		return accumulator	}}class Settlement {	id = 0	hex = 0	districts = []	settlementImprovements = []	discounts = []	name = "Unnamed settlement"	deleted = false	constructor(obj, hex) {		this.hex = hex		if (obj != null) {			this.id = obj.id			this.name = obj.name			if (obj.districts != null)				obj.districts.forEach((d) => {					this.districts.push(new District(d, this))				})			if (obj.settlementImprovements != null && obj.settlementImprovements.length > 0) {				obj.settlementImprovements.forEach((v) => {					this.settlementImprovements.push({id: v.id, building: BuildingList.getById(v.building)})				})			}			if (obj.discounts != null && obj.discounts.length > 0) {				obj.discounts.forEach(d => {					this.discounts.push({id: d.id, building: BuildingList.getById(d.building)})				})			}		}	}	saveSettlement = () => {		return dbLoader(`settlement/${this.id}`, "POST", this.toFormData())	}	addDiscountFor = (building) => {		const discount = {id: 0, building: building}		const formData = new FormData()		formData.append("building", building.id.toString())		formData.append("settlement", this.id.toString())		dbLoader(`discounts`, "PUT", formData)			.then((reply) => {				discount.id = reply.id			})		this.discounts.push(discount)	}	applyDiscountFor = (building) => {		const index = this.discounts.findIndex(d => d.building.id === building.id)		if (index < 0)			return false		dbLoader(`discounts/${this.discounts[index].id}`, "DELETE", null)			.then((s) => {				this.discounts.splice(index, 1)			})		return true	}	addDistrict = () => {		const newDistrict = new District(null, this)		this.districts.push(newDistrict)		dbLoader("district", "PUT", newDistrict.toFormData())			.then((out) => {				newDistrict.id = out.id			})	}	toFormData = () => {		const formData = new FormData()		formData.append("name", this.name.replace("'", "''"))		formData.append("hex", this.hex.id.toString())		return formData	}	deleteDistrict = async (id) => {		const index = this.getDistrictIndexById(id)		if (index < 0) return		this.districts.splice(index, 1)		await dbLoader(`district/${id}`, "DELETE", null)		this.deleted = true	}	addImprovement = (building) => {		const newImprovement = {id: 0, building: building}		const formData = new FormData()		formData.append("building", building.id.toString())		formData.append("settlement", this.id.toString())		dbLoader(`settlement/improvements`, "PUT", formData)			.then(obj => newImprovement.id = obj.id)		this.settlementImprovements.push(newImprovement)	}	removeImprovement = (building) => {		const index = this.settlementImprovements.findIndex(b => b.building.id === building.id)		if (index >= 0) {			dbLoader(				`settlement/improvements/${this.settlementImprovements[index].id}`,				"DELETE",				null)			this.settlementImprovements.splice(index, 1)		}	}	getDistrictIndexById = (id) => {		return this.districts.findIndex((value) => value.id === id)	}	getDistrictByID = (id) => {		const index = this.getDistrictByID(id)		if (index > 0)			return this.districts[index]		return null	}	getSettlementModifiers(acc) {		if (this.districts.length > 0)			this.districts.reduce((acc, d) => {				return d.getDistrictModifiers(acc)			}, acc)		if (this.settlementImprovements.length > 0)			this.settlementImprovements.reduce(buildingReducer, acc)		return acc	}}decorate(Settlement, {	districts: observable.shallow,	settlementImprovements: observable.shallow,})class HexData {	id = 0	x = 0	y = 0	ownedBy = null	terrainType = null	settlement = null	hexImprovements = []	constructor(obj) {		this.id = obj.id		this.x = obj.x		this.y = obj.y		this.terrainType = TerrainList.getById(obj.terrainType)		this.settlement = ((obj.settlement && Object.keys(obj.settlement).length > 0) ? (new Settlement(obj.settlement, this)) : null)		if (obj.hexImprovements) {			obj.hexImprovements.forEach(v =>				this.hexImprovements.push({id: v.id, improvement: ImprovementList.getById(v.improvement)},				))		}		const setOwnedBy = observe(kingdoms, "finishedLoading", change => {			if (change.newValue) {				this.ownedBy = kingdoms.getById(obj.ownedBy)				setOwnedBy()			}		})	}	saveToDb = () => {		dbLoader(`hex/${this.x}-${this.y}`, "POST", this.toFormData())			.then((response) => {				this.id = response[0][0]			})	}	hasImprovement=(improvement)=>{		const index=this.hexImprovements.findIndex(value=>value.improvement.id===improvement.id)		return index>=0;	}	addImprovement=(improvement, cost)=>{		if(!this.ownedBy) return false		if(!improvement) return false		if(this.ownedBy.kingdomData.data.treasury<cost)			return false		this.ownedBy.kingdomData.data.treasury-=cost		this.ownedBy.kingdomData.saveToDb()		const newImprovement={id:0, improvement:improvement}		this.hexImprovements.push(newImprovement)		const formData=new FormData()		formData.append("improvement", improvement.id.toString())		formData.append("hex", this.id.toString())		dbLoader("hexImprovements", "PUT", formData)			.then(reply=>{				newImprovement.id=reply.id			})		return true	}	removeImprovement=(improvement)=>{		if(!improvement) return		const index=this.hexImprovements.findIndex(value=>value.improvement.id===improvement.id)		dbLoader(`hexImprovements/${this.hexImprovements[index].id}`, "DELETE")		this.hexImprovements.splice(index, 1)	}	setTerrain=(terrain)=>{		this.terrainType=terrain		this.saveToDb()	}	createSettlement = () => {		if (this.settlement == null) {			this.settlement = new Settlement(null, this)			dbLoader("settlement", "PUT", this.settlement.toFormData())				.then((out) => this.settlement.id = out.id)		}	}	toFormData = () => {		const formData = new FormData()		formData.append("xcoord", this.x.toString())		formData.append("ycoord", this.y.toString())		formData.append("owned_by", (this.ownedBy != null && this.ownedBy.id != null) ? this.ownedBy.id.toString() : 0)		formData.append("terrain_type", this.terrainType?this.terrainType.id.toString():"0")		return formData	}	getSettlementModifiers = (acc) => {		if (this.settlement != null)			return this.settlement.getSettlementModifiers(acc)		return acc	}}class HexDataGrid {	hexGrid = observable([])	loaded = false	selected = -1	initialize = () => {		this.loaded = false		dbLoader("hex/hexData", "GET")			.then((hexes) => {					hexes.forEach((hex) => {						this.hexGrid.push(new HexData(hex))					})					this.loaded = true				},			)	}	getById = (id) => {		this.hexGrid.forEach((hex) => {			if (hex.id === id)				return hex		})		return null	}	getByCoords = (x, y) => {		for (let i = 0; i < this.hexGrid.length; i++)			if (this.hexGrid[i].x === x && this.hexGrid[i].y === y) {				return this.hexGrid[i]			}		const newHexData=new HexData({id: 0, x: x, y: y, ownedBy: -1, terrainType: -1})		this.hexGrid.push(newHexData)		return newHexData	}	getByKingdom = computedFn((id) => {		// const out = []		return this.hexGrid.filter(value=>value.ownedBy&&value.ownedBy.id===id)		// for (let i = 0; i < this.hexGrid.length; i++)		// 	if (this.hexGrid[i].ownedBy != null && this.hexGrid[i].ownedBy.id === id)		// 		out.push(this.hexGrid[i])		// return out	}, true)	getModifiersByKingdomId = (id) => {		if (id <= 0) return new Accumulator()		const acc = new Accumulator()		this.getByKingdom(id).forEach((value => {			value.getSettlementModifiers(acc)		}))		return acc	}}decorate(HexData, {	ownedBy: observable,})decorate(HexDataGrid, {	loaded: observable,	selected: observable,})const hexDataGrid = new HexDataGrid()hexDataGrid.initialize()export {HexData, hexDataGrid, Accumulator}