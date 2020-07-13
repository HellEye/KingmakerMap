import {decorate, observable, observe} from "mobx"
import dbLoader from "../../utils/dbLoader"
import KingdomData, {emptyKingdomData} from "./kingdomData"
import {getCookie} from "../../utils/cookies"
import {computedFn} from "mobx-utils"

const kingdomUrl = 'kingdoms'
const kingdomDataUrl = 'kingdomStats'
let selectedKingdom = observable.box(null)

class Kingdom {
	constructor(name, color = "#ffffff", data = null, id = 0) {
		this.id = id
		this.name = name
		this.color = color
		this.kingdomData = new KingdomData(data)
	}

	toFormData = () => {
		const data = new FormData()
		data.append("name", `'${this.name.replace("'", "''")}'`)
		data.append("color", `'${this.color}'`)
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

decorate(Kingdom, {
	name: observable,
	color: observable
})

class Kingdoms {
	kingdoms = observable([])
	finishedLoading = true
	kingdomChanged = -1

	constructor() {
		this.finishedLoading = false
		this.loadKingdomsFromDb()
			.then(() => {
				this.finishedLoading = true
			})
	}

	getIndexById = (id) => {
		for (let i = 0; i < this.kingdoms.length; i++) {
			if (this.kingdoms[i].id === id)
				return i
		}
		return -1;
	}
	getById = computedFn((id) => {
		if(id<=0) return null
		for (let i = 0; i < this.kingdoms.length; i++) {
			if (this.kingdoms[i].id === id) {
				return this.kingdoms[i]
			}
		}
		return null;
	})
	getByName = (name) => {
		for (let i = 0; i < this.kingdoms.length; i++) {
			if (this.kingdoms[i].name === name) {
				return this.kingdoms[i]
			}
		}
		return null;
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
		await dbLoader(`${kingdomUrl}/${this.kingdoms[index].id}`, "POST", this.kingdoms[index].toFormData())
		this.kingdomChanged = this.kingdoms[index].id
		this.kingdomChanged = -1

	}
	loadKingdomsFromDb = async () => {
		this.kingdoms = []
		const kingdomList = await dbLoader(kingdomUrl, "GET")
		const kingdomData = await dbLoader(kingdomDataUrl, "GET")
		kingdomList.forEach(k => {
			this.kingdoms.push(new Kingdom(k[1], k[2]))
			this.kingdoms[this.kingdoms.length - 1].id = k[0]
		})
		this.kingdoms.forEach(k => {
			for (let i = 0; i < kingdomData.length; i++) {
				if (k.id === kingdomData[i].kingdomId)
					k.kingdomData.setData(kingdomData[i])
			}
		})
	}
	map = (f) => {
		return this.kingdoms.map(f)
	}

}

decorate(Kingdoms, {
	kingdoms: observable,
	finishedLoading: observable,
	kingdomChanged: observable
})

const kingdoms = new Kingdoms()
const kingdomsLoaded = observe(kingdoms, "finishedLoading", change => {
	if (change.newValue) {
		const loadedId = getCookie("lastLoadedKingdom")
		if (loadedId !== "")
			selectedKingdom.set(kingdoms.getById(parseInt(loadedId)))
		kingdomsLoaded()
	}
})

export {Kingdom, kingdoms, selectedKingdom}
