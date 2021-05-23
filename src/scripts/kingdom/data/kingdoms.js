import { makeObservable, observable, observe } from "mobx"
import dbLoader from "../../utils/dbLoader"
import KingdomData, { emptyKingdomData } from "./kingdomData"
import { getCookie } from "../../utils/cookies"
import { computedFn } from "mobx-utils"
import socketDataReplacer from "../../utils/socketDataReplacer"
const kingdomUrl = "kingdoms"
const kingdomDataUrl = "kingdomStats"
let selectedKingdom = observable.box(null)

class Kingdom {
	constructor(obj) {
		this.id = obj._id
		this.name = obj.name
		this.color = obj.color
		this.kingdomData = new KingdomData(obj.stats)
		makeObservable(this, {
			name: observable,
			color: observable
		})
	}
	update(id, name, color) {
		this.id = id
		this.name = name
		this.color = color
	}

	toFormData = () => {
		const data = new FormData()
		data.append("name", `${this.name.replace("'", "''")}`)
		data.append("color", `${this.color}`)
		return data
	}
	createKingdomData = async () => {
		if (this.kingdomData.data != null) return
		this.kingdomData.setData(emptyKingdomData)
		this.kingdomData.data.kingdomId = this.id
		await dbLoader(kingdomDataUrl, "PUT", this.kingdomData.toFormData())
	}
	toString = () => {
		return this.name
	}
}



class Kingdoms {
	kingdoms = observable([])
	finishedLoading = true
	kingdomChanged = -1

	constructor() {
		this.finishedLoading = false
		makeObservable(this, {
			kingdoms: observable,
			finishedLoading: observable,
			kingdomChanged: observable
		})
		const callbacks = {
			onLoaded: this._onLoaded,
			onInsert: this._onInsert,
			onDelete: this._onDelete,
			clearAll: this._clearAll
		}
		socketDataReplacer.watch("kingdoms", callbacks)
	}
	_onLoaded = () => {
		this.finishedLoading = true
	}
	_onDelete = (id) => {
		this.kingdoms.splice(
			this.kingdoms.findIndex((v) => v.id === id),
			1
		)
	}
	_onInsert = (obj) => {
		this.kingdoms.push(new Kingdom(obj))
	}
	_clearAll = () => {
		this.kingdoms.clear()
	}

	getIndexById = (id) => {
		for (let i = 0; i < this.kingdoms.length; i++) {
			if (this.kingdoms[i].id === id) return i
		}
		return -1
	}
	getById = (id) => {
		if (!id) return null
		return this.kingdoms.find(v=>v.id===id)
	}

	getByName = (name) => {
		for (let i = 0; i < this.kingdoms.length; i++) {
			if (this.kingdoms[i].name === name) {
				return this.kingdoms[i]
			}
		}
		return null
	}
	push = async (obj) => {
		this.kingdoms.push(obj)
		await dbLoader(kingdomUrl, "PUT", obj.toFormData())
	}
	remove = async (index) => {
		await dbLoader(`${kingdomUrl}/${this.kingdoms[index].id}`, "DELETE")
		this.kingdoms.splice(index, 1)
	}

	editFinished = async (index) => {
		await dbLoader(
			`${kingdomUrl}/${this.kingdoms[index].id}`,
			"POST",
			this.kingdoms[index].toFormData()
		)
		this.kingdomChanged = this.kingdoms[index].id
		this.kingdomChanged = -1
	}
	loadKingdomDataFromDb = async () => {
		const kingdomData = await dbLoader(kingdomDataUrl, "GET")
		this.kingdoms.forEach((k) => {
			for (let i = 0; i < kingdomData.length; i++) {
				if (k.id === kingdomData[i].kingdomId)
					k.kingdomData.setData(kingdomData[i])
			}
		})
	}
	loadKingdomsFromDb = async () => {
		this.kingdoms = []
		const kingdomList = await dbLoader(kingdomUrl, "GET")
		kingdomList.forEach((k) => {
			this.kingdoms.push(new Kingdom(k[1], k[2]))
			this.kingdoms[this.kingdoms.length - 1].id = k[0]
		})
		await this.loadKingdomDataFromDb()
	}
	updateKingdom = (id) => {
		const kingdom = this.kingdoms.find((k) => k.id === id || k.id === -1)
		dbLoader(`${kingdomUrl}/${id}`, "GET").then((data) => {
			if (kingdom && data) kingdom.update(data.id, data.name, data.color)
			else if (!kingdom && data)
				this.kingdoms.push(new Kingdom(data.name, data.color, null, data.id))
			else if (kingdom && !data) this.kingdoms.remove(kingdom)
		})
	}

	updateKingdomData = (id) => {
		const kingdom = this.kingdoms.find((k) => k.id === id)
		dbLoader(`${kingdomDataUrl}/${id}`, "GET").then((data) => {
			if (!data && kingdom) kingdom.kingdomData = null
			else if (kingdom && kingdom.kingdomData) kingdom.kingdomData.setData(data)
			else if (kingdom) kingdom.kingdomData = new KingdomData(data)
		})
	}
	map = (f) => {
		return this.kingdoms.map(f)
	}
}



const kingdoms = new Kingdoms()
observe(kingdoms, "finishedLoading", (change) => {
	if (change.newValue) {
		const loadedId = getCookie("lastLoadedKingdom")
		if (loadedId) selectedKingdom.set(kingdoms.getById(loadedId))
	}
})

export { Kingdom, kingdoms, selectedKingdom }
