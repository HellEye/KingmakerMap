import {decorate, observable} from "mobx"
import dbLoader from "../../utils/dbLoader"
import KingdomData from "./kingdomData"

const kingdomUrl = 'kingdoms'

class Kingdom {
	constructor(id, name, color = "#ffffff") {
		this.id = id
		this.name = name
		this.color = color
	}

	color = "#ffffff"
	name = ""

	kingdomData=new KingdomData()

	toFormData = () => {
		const data = new FormData()
		data.append("name", `'${this.name}'`)
		data.append("color", `'${this.color}'`)
		data.forEach((value, key) => {
			console.log(`${key}: ${value}`)
		})
		return data
	}
	toString=()=>{
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

	constructor() {
		this.finishedLoading = false
		this.loadKingdomsFromDb()
			.then(() => {this.finishedLoading = true
			})
	}

	getIndexById = (id) => {
		for(let i=0;i<this.kingdoms.length;i++){
			if(this.kingdoms[i].id===id)
				return i
		}
		return -1;
	}
	getById = (id) => {
		for(let i=0;i<this.kingdoms.length;i++){
			if(this.kingdoms[i].id===id){
				return this.kingdoms[i]}
		}
		return null;
	}
	getByName = (name)=>{
		for(let i=0;i<this.kingdoms.length;i++){
			if(this.kingdoms[i].name===name){
				return this.kingdoms[i]}
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
	}
	loadKingdomsFromDb = async () => {
		this.kingdoms = []
		const kingdomList = await dbLoader(kingdomUrl, "GET")
		kingdomList.forEach(k => this.kingdoms.push(new Kingdom(k[0], k[1], k[2])))
	}
	map = (f) => {
		return this.kingdoms.map(f)
	}

}

decorate(Kingdoms, {
	kingdoms: observable,
	finishedLoading: observable
})
const kingdoms = new Kingdoms()


export {Kingdom, kingdoms}
