import { computed, makeObservable, observable } from "mobx"
import dbLoader from "../../utils/dbLoader"
import hexDataGrid from "./hexes/HexDataGrid"
import socketHandler from "../../utils/socketHandler"
import dotNotation from "mongo-dot-notation"
const emptyKingdomData = observable({
	alignment: 0,
	economy: 0,
	stability: 0,
	loyalty: 0,
	unrest: 0,
	consumption: 0,
	consumptionModifier: 0,
	treasury: 0,
	positions: {
		ruler: 0,
		rulerSelectedAttributes: {
			stability: false,
			loyalty: false,
			economy: false,
		},
		consort: 0,
		councilor: 0,
		general: 0,
		grandDiplomat: 0,
		heir: 0,
		highPriest: 0,
		magister: 0,
		marshal: 0,
		royalEnforcer: 0,
		spymaster: 0,
		spymasterSelectedAttribute: {
			stability: true,
			loyalty: false,
			economy: false,
		},
		treasurer: 0,
		viceroy: 0,
		warden: 0,
	},
	kingdomId: 0,
})

const edicts = {
	expansionEdict: [
		{
			name: "Isolationist",
			stability: 2,
			loyalty: 1,
			economy: -2,
			extraClaims: -1,
			consumption: {
				min: -1,
				max:-1,
			},
			consumptionDie: "-1",
			other: "-1 hex claims, -1 consumption",
		},
		{
			name: "Cautious",
			stability: 1,
			loyalty: 0,
			economy: -1,
			extraClaims: 0,
			consumption: {
				min: 0,
				max: 0,
			},
			consumptionDie:"0",
			other: "standard claims",
		},
		{
			name: "Standard",
			stability: 0,
			loyalty: 0,
			economy: 0,
			extraClaims: 0,
			consumption: {
				min: 0,
				max: 0,
			},
			other: "standard claims",
		},
		{
			name: "Aggressive",
			stability: -1,
			loyalty: -1,
			economy: 1,
			extraClaims: 1,
			consumption: {
				min: 1,
				max: 4,
			},
			consumptionDie: "1d4",
			other: "+1 hex claims, 1d4 consumption",
		},
		{
			name: "Imperialist",
			stability: -2,
			loyalty: -2,
			economy: 2,
			extraClaims: 2,
			consumption: {
				min: 2,
				max: 8,
			},
			consumptionDie: "2d4",
			other: "+2 hex claims, 2d4 consumption",
		},
	],
	holidayEdict: [
		{
			name: "None",
			stability: 0,
			loyalty: -4,
			economy: -2,
			consumption: {
				min: 0,
				max: 0,
			},
			consumptionDie: "0",
			other: "consumption: 0",
		},
		{
			name: "Annual",
			stability: 0,
			loyalty: -2,
			economy: -1,
			consumption: {
				min: 1,
				max: 1,
			},
			consumptionDie: "1",
			other: "consumption: 1",
		},
		{
			name: "Quaterly",
			stability: 0,
			loyalty: 0,
			economy: 0,
			consumption: {
				min: 1,
				max: 3,
			},
			consumptionDie: "1d3",
			other: "consumption: 1d3",
		},
		{
			name: "Monthly",
			stability: 0,
			loyalty: 2,
			economy: 1,
			consumption: {
				min: 1,
				max: 6,
			},
			consumptionDie: "1d6",
			other: "consumption: 1d6",
		},
		{
			name: "Weekly",
			stability: 0,
			loyalty: 4,
			economy: 2,
			consumption: {
				min: 1,
				max: 12,
			},
			consumptionDie: "1d12",
			other: "consumption: 1d12",
		},
	],
	taxationEdict: [
		{
			name: "Minimal",
			stability: 0,
			loyalty: 2,
			economy: 2,
			divideBy: 5,
			other: "BP: Economy check/5",
		},
		{
			name: "Light",
			stability: 0,
			loyalty: 1,
			economy: 1,
			divideBy: 4,
			other: "BP: Economy check/4",
		},
		{
			name: "Normal",
			stability: 0,
			loyalty: 0,
			economy: 0,
			divideBy: 3,
			other: "BP: Economy check/3",
		},
		{
			name: "Heavy",
			stability: 0,
			loyalty: -4,
			economy: -2,
			divideBy: 2.5,
			other: "BP: Economy check/2.5",
		},
		{
			name: "Crushing",
			stability: 0,
			loyalty: -8,
			economy: -4,
			divideBy: 2,
			other: "BP: Economy check/2",
		},
	],
	recruitmentEdict: [
		{
			name: "Pacifist",
			stability: 0,
			loyalty: 0,
			economy: 2,
			fame: 2,
			other: "manpower 1%, elites 0%",
		},
		{
			name: "Peaceful",
			stability: 0,
			loyalty: 0,
			economy: 1,
			fame: 1,
			other: "manpower 5%, elites 0%",
		},
		{
			name: "Normal",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			other: "manpower 10%, elites 1%",
		},
		{
			name: "Aggressive",
			stability: 0,
			loyalty: 0,
			economy: -1,
			fame: -1,
			other: "manpower 15%, elites 3%",
		},
		{
			name: "Warlike",
			stability: 0,
			loyalty: 0,
			economy: -2,
			fame: -2,
			other: "manpower 20%, elites 5%",
		},
	],
	widthdrawalEdict: [
		{
			name: "None",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:0,
			other: "Increase consumption by 0 and gain 0GP"
		},
		{
			name: "Poor",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:4,
			other: "Increase consumption by 1d4+4 and gain 4BP as gold"
		},
		{
			name: "Low",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:6,
			other: "Increase consumption by 1d6+6 and gain 6BP as gold"
		},
		{
			name: "Modest",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:8,
			other: "Increase consumption by 1d8+8 and gain 8BP as gold"
		},
		{
			name: "Comfortable",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:10,
			other: "Increase consumption by 1d10+10 and gain 10BP as gold"
		},
		{
			name: "Wealthy",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:12,
			other: "Increase consumption by 1d12+12 and gain 12BP as gold"
		},
		{
			name: "Aristocratic",
			stability: 0,
			loyalty: 0,
			economy: 0,
			fame: 0,
			level:20,
			other: "Increase consumption by 1d20+20 and gain 20BP as gold"
		},

	]
}

class KingdomData {
	constructor(data, kingdom) {
		this.data = { ...this.data, ...data }
		this.kingdom = kingdom
		makeObservable(this, {
			data: observable,
			size: computed,
		})
	}

	update = (data) => {
		this.data = { ...this.data, ...data }
	}

	data = {
		alignment: 0,
		economy: 0,
		stability: 0,
		loyalty: 0,
		unrest: 0,
		consumption: 0,
		consumptionModifier: 0,
		size: 0,
		treasury: 0,
		positions: {
			ruler: 0,
			rulerSelectedAttributes: {
				stability: false,
				loyalty: false,
				economy: false,
			},
			consort: 0,
			councilor: 0,
			general: 0,
			grandDiplomat: 0,
			heir: 0,
			highPriest: 0,
			magister: 0,
			marshal: 0,
			royalEnforcer: 0,
			spymaster: 0,
			spymasterSelectedAttribute: {
				stability: false,
				loyalty: false,
				economy: false,
			},
			treasurer: 0,
			viceroy: 0,
			warden: 0,
		},
		kingdomId: 0,
		controlDCMod: 0,
		extraBP: 0,
		expansionEdict: 0,
		holidayEdict: 0,
		taxationEdict: 0,
		recruitmentEdict: 0,
		widthdrawalEdict:0,
	}
	setData = (newData) => {
		this.data = observable(newData)
	}
	fieldChanged = (fieldName) => {
		const newObj = { stats: {} }
		newObj.stats[fieldName] = this.data[fieldName]
		socketHandler.emit("update", {
			collection: "kingdoms",
			findObj: { _id: this.kingdom.id },
			newObj: dotNotation.flatten(newObj),
		})
	}
	positionsFieldChanged = (fieldName) => {
		const newObj = { stats: { positions: {} } }
		newObj.stats.positions[fieldName] = this.data.positions[fieldName]
		socketHandler.emit("update", {
			collection: "kingdoms",
			findObj: { _id: this.kingdom.id },
			newObj: dotNotation.flatten(newObj),
		})
	}

	setField = (field, value) => {
		this.data[field] = value
		this.fieldChanged(field)
	}
	setPositionsField = (field, value) => {
		this.data.positions[field] = value
		this.positionsFieldChanged(field)
	}

	get unrest() {
		return ""
	}
	get edictMinConsumption() {
		return (
			edicts.expansionEdict[this.data.expansionEdict].consumption.min +
			edicts.holidayEdict[this.data.holidayEdict].consumption.min
		)
	}
	get edictMaxConsumption() {
		return (
			edicts.expansionEdict[this.data.expansionEdict].consumption.max +
			edicts.holidayEdict[this.data.holidayEdict].consumption.max
		)
	}

	get hexClaims() {
		const bonus = edicts.expansionEdict[this.data.expansionEdict].extraClaims
		if (this.size <= 10) return 1 + bonus
		if (this.size <= 25) return 2 + bonus
		if (this.size <= 50) return 3 + bonus
		if (this.size <= 100) return 4 + bonus
		if (this.size <= 200) return 8 + bonus
		return 12 + bonus
	}
	get newSettlements() {
		if (this.size <= 10) return 1
		if (this.size <= 25) return 1
		if (this.size <= 50) return 1
		if (this.size <= 100) return 2
		if (this.size <= 200) return 3
		return 4
	}
	get newImprovements() {
		if (this.size <= 10) return 2
		if (this.size <= 25) return 3
		if (this.size <= 50) return 5
		if (this.size <= 100) return 7
		if (this.size <= 200) return 9
		return 12
	}
	get newBuildings() {
		if (this.size <= 10) return 1
		if (this.size <= 25) return 2
		if (this.size <= 50) return 5
		if (this.size <= 100) return 10
		if (this.size <= 200) return 20
		return Infinity
	}
	get bpCost() {
		if (this.size <= 25) return 1000
		if (this.size <= 50) return 2000
		if (this.size <= 100) return 3000
		return 4000
	}

	get controlDCMod() {
		return 0
	}

	get economy() {
		if (this.data == null) return 0
		return (
			this.data.positions.rulerSelectedAttributes.economy *
				(this.data.positions.ruler || 0) +
			Math.floor(this.data.positions.spymaster || 0) *
				this.data.positions.spymasterSelectedAttribute.economy +
			(this.data.positions.magister || 0) +
			(this.data.positions.marshal || 0) +
			(this.data.positions.treasurer || 0) +
			Math.floor(this.data.positions.viceroy / 2) +
			(this.data.alignment % 3 === 2 ? 2 : 0) +
			(Math.floor(this.data.alignment / 3) === 0 ? 2 : 0) +
			edicts.expansionEdict[this.data.expansionEdict].economy +
			edicts.holidayEdict[this.data.holidayEdict].economy +
			edicts.recruitmentEdict[this.data.recruitmentEdict].economy +
			edicts.taxationEdict[this.data.taxationEdict].economy
		)
	}

	get stability() {
		if (this.data == null) return 0
		return (
			this.data.positions.rulerSelectedAttributes.stability *
				(this.data.positions.ruler || 0) +
			Math.floor(this.data.positions.spymaster || 0) *
				this.data.positions.spymasterSelectedAttribute.stability +
			(this.data.positions.general || 0) +
			(this.data.positions.grandDiplomat || 0) +
			(this.data.positions.highPriest || 0) +
			(this.data.alignment % 3 === 1 ? 2 : 0) +
			(Math.floor(this.data.alignment / 3) === 1 ? 2 : 0) +
			edicts.expansionEdict[this.data.expansionEdict].stability +
			edicts.holidayEdict[this.data.holidayEdict].stability +
			edicts.recruitmentEdict[this.data.recruitmentEdict].stability +
			edicts.taxationEdict[this.data.taxationEdict].stability
		)
	}

	get loyalty() {
		if (this.data == null) return 0
		return (
			this.data.positions.rulerSelectedAttributes.loyalty *
				(this.data.positions.ruler || 0) +
			Math.floor(this.data.positions.spymaster || 0) *
				this.data.positions.spymasterSelectedAttribute.loyalty +
			Math.floor(this.data.positions.consort / 2 || 0) +
			(this.data.positions.councilor || 0) +
			Math.floor(this.data.positions.heir / 2 || 0) +
			(this.data.positions.royalEnforcer || 0) +
			(this.data.positions.warden || 0) +
			(this.data.alignment % 3 === 0 ? 2 : 0) +
			(Math.floor(this.data.alignment / 3) === 2 ? 2 : 0) +
			edicts.expansionEdict[this.data.expansionEdict].loyalty +
			edicts.holidayEdict[this.data.holidayEdict].loyalty +
			edicts.recruitmentEdict[this.data.recruitmentEdict].loyalty +
			edicts.taxationEdict[this.data.taxationEdict].loyalty
		)
	}

	get size() {
		
		if (this.data) {

			return hexDataGrid.getByKingdom(this.kingdom.id).length
		}
		return 0
	}

	get districtNumber() {
		if (this.data != null) {
			return hexDataGrid
				.getByKingdom(this.data.kingdomId)
				.reduce((acc, value) => {
					return (
						acc +
						(value.settlement == null || value.settlement.districts == null
							? 0
							: value.settlement.districts.length)
					)
				}, 0)
		}
		return 0
	}

	get consumption() {
		if (this.data == null) return 0
		return Math.max(this.size + this.districtNumber, 0) + edicts.widthdrawalEdict[this.data.widthdrawalEdict].level
	}

	getConsumptionExtrasString = () => {
		const out = []
		const expansion = edicts.expansionEdict[this.data.expansionEdict].consumptionDie
		if (expansion !== "0")
			out.push(expansion)
		const holiday = edicts.holidayEdict[this.data.holidayEdict].consumptionDie
		if(holiday!== "0")
			out.push(holiday)
		const widthdrawal = edicts.widthdrawalEdict[this.data.widthdrawalEdict].level
		if (widthdrawal !== 0)
			out.push(`1d${widthdrawal}`)
		return out.reduce((prev, v) => {
			return prev + (v<0?'': '+') + v 
		}, "")
	}

	saveToDb = () => {
		dbLoader(
			`kingdomStats/${this.data.kingdomId}`,
			"POST",
			this.toFormData()
		).catch((err) => {
			console.error("Failed to save kingdomData")
			console.error(err)
		})
	}
	loadFromDb = () => {}
	getRulerAttributes = () => {
		return this.data.positions.rulerSelectedAttributes.stability
			? 1
			: 0 + this.data.positions.rulerSelectedAttributes.loyalty
			? 2
			: 0 + this.data.positions.rulerSelectedAttributes.economy
			? 4
			: 0
	}
	getSpymasterAttribute = () => {
		if (this.data.positions.spymasterSelectedAttribute.stability) return 1
		if (this.data.positions.spymasterSelectedAttribute.loyalty) return 2
		if (this.data.positions.spymasterSelectedAttribute.economy) return 3
		return 0
	}
	toFormData = () => {
		const formData = new FormData()
		for (let key in this.data) {
			if (key !== "positions") formData.append(key, this.data[key])
			else {
				for (let positionKey in this.data.positions) {
					if (positionKey === "rulerSelectedAttributes") {
						formData.append(
							"rulerAttributes",
							this.getRulerAttributes().toString()
						)
					} else if (positionKey === "spymasterSelectedAttribute")
						formData.append(
							"spymasterAttributes",
							this.getSpymasterAttribute().toString()
						)
					else formData.append(positionKey, this.data.positions[positionKey])
				}
			}
		}
		return formData
	}

	getControlDC = () => {
		if (this.data == null) return 20
		return 20 + this.size + this.districtNumber + this.data.controlDCMod
	}
}

export default KingdomData
export { emptyKingdomData, edicts }
