import {decorate, observable} from "mobx"import dbLoader from "../../utils/dbLoader"import {kingdoms} from "./kingdoms"class Accumulator {	economy = 0	stability = 0	loyalty = 0	defense = 0	unrest = 0	fame = 0}decorate(Accumulator, {	bonus: observable})function reducer(b, acc) {	acc.economy += b.economy	acc.stability += b.stability	acc.loyalty += b.loyalty	acc.defense += b.defense	acc.unrest += b.unrest	acc.fame += b.fame}class BuildingDetails {	id = 0	building = 0	x = 0	y = 0	constructor(obj) {		this.id = obj.id		this.building = obj.building		this.x = obj.x		this.y = obj.y	}}class BuildingGrid {	buildings = []	district = null	constructor(obj, district) {		if (obj != null)			obj.forEach((b) => {				this.buildings.push(new BuildingDetails(b))			})		this.district = district	}	getBuildingGridModifiers = (accumulator) => {		return this.buildings.reduce(reducer, accumulator)	}}class District {	id = 0	settlement = 0	buildingGrid = null	constructor(obj, settlement) {		this.settlement = settlement		if (obj == null) {			this.buildingGrid = new BuildingGrid(null, this)		} else {			this.id = obj.id			this.buildingGrid = new BuildingGrid(obj.buildings, this)		}	}	getDistrictModifiers(accumulator) {		if (this.buildingGrid != null)			return this.buildingGrid.getBuildingGridModifiers(accumulator)		return accumulator	}}class Settlement {	id = 0	hex = 0	districts = []	name = ""	constructor(obj, hex) {		this.hex = hex		if (obj != null) {			this.id = obj.id			this.name = obj.name			if (obj.districts != null)				obj.districts.forEach((d) => {					this.districts.push(new District(d, this))				})		}	}	addDistrict = () => {		this.districts.push(new District(null, this))		//TODO update database	}	getSettlementModifiers = (acc) => {		return this.districts.reduce((acc, d) => {			console.log(d)			return d.getDistrictModifiers(acc)		}, acc)	}}class HexData {	id = 0	x = 0	y = 0	ownedBy = null	terrainType = 0	settlement = null	constructor(obj) {		this.id = obj.id		this.x = obj.x		this.y = obj.y		this.ownedBy = kingdoms.getById(obj.ownedBy)		this.terrainType = obj.terrainType		this.settlement = obj.settlement ? new Settlement(obj.settlement, this) : null	}	createSettlement = () => {		//TODO update Database etc		if(this.settlement==null)			this.settlement = new Settlement(null, this);	}	getSettlementModifiers = (acc) => {		if (this.settlement != null)			return this.settlement.getSettlementModifiers(acc)		return acc	}}class HexDataGrid {	hexGrid = observable([])	loaded = false	selected = -1	initialize = async () => {		this.loaded = false		dbLoader("hex/hexData", "GET")			.then((hexes) => {					hexes.forEach((hex) => {						this.hexGrid.push(new HexData(hex))					})					this.loaded = true				}			)	}	getById = (id) => {		this.hexGrid.forEach((hex) => {			if (hex.id === id)				return hex		})		return null	}	getByCoords = (x, y) => {		for (let i = 0; i < this.hexGrid.length; i++)			if (this.hexGrid[i].x === x && this.hexGrid[i].y === y) {				return this.hexGrid[i]			}		return new HexData({id: 0, x: x, y: y, ownedBy: -1, terrainType: -1})	}	getByKingdom = (id) => {		const out = []		for (let i = 0; i < this.hexGrid.length; i++)			if (this.hexGrid[i].ownedBy.id === id)				out.push(this.hexGrid[i])		return out	}	getModifiersByKingdomId = (id) => {		const hexDatas = this.getByKingdom(id)		const outAcc = hexDatas.reduce(reducer, new Accumulator())		return outAcc	}}decorate(HexDataGrid, {	loaded: observable,	selected: observable})const hexDataGrid = new HexDataGrid()hexDataGrid.initialize().then()export {HexData, hexDataGrid, Accumulator}