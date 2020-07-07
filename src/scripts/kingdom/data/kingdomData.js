import {computed, decorate, observable} from "mobx"
import dbLoader from "../../utils/dbLoader"
import {hexDataGrid} from "./hexData"

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

class KingdomData {

	constructor(data) {
		this.data = data
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
	}
	setData = (newData) => {
		this.data = newData
	}

	/*getters = {
		economy: this.getEconomyMod,
		stability: this.getStabilityMod,
		loyalty: this.getLoyaltyMod,
		consumptionModifier: this.getConsumptionMod,
		unrest: () => "",
		controlDCMod:()=>this.data.controlDCMod
	}
*/
	get unrest() {
		return ""
	}

	get controlDCMod() {
		return 0
	}

	get economy() {
		if (this.data == null) return 0
		return (
			(this.data.positions.rulerSelectedAttributes.economy * ((this.data.positions.ruler) || 0)) +
			Math.floor((this.data.positions.spymaster) || 0) * this.data.positions.spymasterSelectedAttribute.economy +
			((this.data.positions.magister) || 0) +
			((this.data.positions.marshal) || 0) +
			((this.data.positions.treasurer) || 0) +
			Math.floor(this.data.positions.viceroy / 2) +
			((this.data.alignment % 3 === 2) ? 2 : 0) +
			((Math.floor(this.data.alignment / 3) === 0) ? 2 : 0)
		)
	}

	get stability() {
		if (this.data == null) return 0
		const out = (
			(this.data.positions.rulerSelectedAttributes.stability * ((this.data.positions.ruler) || 0)) +
			Math.floor((this.data.positions.spymaster) || 0) * this.data.positions.spymasterSelectedAttribute.stability +
			((this.data.positions.general) || 0) +
			((this.data.positions.grandDiplomat) || 0) +
			((this.data.positions.highPriest) || 0) +
			((this.data.alignment % 3 === 1) ? 2 : 0) +
			((Math.floor(this.data.alignment / 3) === 1) ? 2 : 0)
		)
		return out

	}

	get loyalty() {
		if (this.data == null) return 0
		return (
			(this.data.positions.rulerSelectedAttributes.loyalty * ((this.data.positions.ruler) || 0)) +
			Math.floor((this.data.positions.spymaster) || 0) * this.data.positions.spymasterSelectedAttribute.loyalty +
			Math.floor((this.data.positions.consort / 2) || 0) +
			((this.data.positions.councilor) || 0) +
			Math.floor((this.data.positions.heir / 2) || 0) +
			((this.data.positions.royalEnforcer) || 0) +
			((this.data.positions.warden) || 0) +
			((this.data.alignment % 3 === 0) ? 2 : 0) +
			((Math.floor(this.data.alignment / 3) === 2) ? 2 : 0)
		)
	}

	get size() {
		if (this.data != null) {
			return hexDataGrid.getByKingdom(this.data.kingdomId).length
		}
		return 0
	}

	get districtNumber() {
		if (this.data != null) {
			return hexDataGrid.getByKingdom(this.data.kingdomId).reduce(value => {
				return value.settlement == null ? 0 : value.settlement.districts.length
			}, 0)
		}
		return 0
	}

	get consumptionModifier() {
		if (this.data == null) return 0
		return this.data.consumptionModifier > this.data.consumption + (this.data.size ? 0 : this.data.consumption + this.data.size)
	}


	saveToDb = () => {
		dbLoader(`kingdomStats/${this.data.kingdomId}`, "POST", this.toFormData())
			.catch(err => {
				console.error("Failed to save kingdomData")
				console.error(err)
			})
	}
	getRulerAttributes = () => {
		return this.data.positions.rulerSelectedAttributes.stability ? 1 : 0 +
		this.data.positions.rulerSelectedAttributes.loyalty ? 2 : 0 +
		this.data.positions.rulerSelectedAttributes.economy ? 4 : 0
	}
	getSpymasterAttribute = () => {
		if (this.data.positions.spymasterSelectedAttribute.stability)
			return 1
		if (this.data.positions.spymasterSelectedAttribute.loyalty)
			return 2
		if (this.data.positions.spymasterSelectedAttribute.economy)
			return 3
		return 0
	}
	toFormData = () => {
		const formData = new FormData()
		for (let key in this.data) {
			if (key !== "positions")
				formData.append(key, this.data[key])
			else {
				for (let positionKey in this.data.positions) {
					if (positionKey === "rulerSelectedAttributes") {
						formData.append("rulerAttributes", this.getRulerAttributes().toString())
					} else if (positionKey === "spymasterSelectedAttribute")
						formData.append("spymasterAttributes", this.getSpymasterAttribute().toString())
					else
						formData.append(positionKey, this.data.positions[positionKey])

				}
			}

		}
		return formData
	}

	getControlDC = () => {
		if (this.data == null) return 0
		return this.size + this.districtNumber + this.data.controlDCMod
	}
}

decorate(KingdomData, {
	data: observable,
	size: computed,
})
export default KingdomData
export {emptyKingdomData}