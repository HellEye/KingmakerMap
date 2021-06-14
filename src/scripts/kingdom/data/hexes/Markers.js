import { observable, makeObservable, action } from "mobx"
import socketHandler from "../../../utils/socketHandler"
import socketDataReplacer from "../../../utils/socketDataReplacer"
import { Marker } from "./Marker"

class Markers {
	markerList = []
	loaded = false

	constructor() {
		// dbLoader("markers", "GET")
		// 	.then(obj => {
		// 		obj.forEach(v => this.markerList.push(new Marker(v)))
		// 		this.loaded = true
		// 	})
		// socketHandler.on("found", (data) => {
		// 	if (data.collection === "markers") {
		// 		if(data.findObj && Object.keys(data.findObj).length === 0){
		// 			//first load from self request
		// 			this.markerList.length=0
		// 			data.result.forEach(v => this.markerList.push(new Marker(v)))
		// 			console.log(this.markerList[0]?.toJson())
		// 			this.loaded=true
		// 		}
		// 	}
		// })
		makeObservable(this, {
			markerList: observable,
			loaded: observable,
		})
		const callbacks = {
			onLoaded: action(() => (this.loaded = true)),
			onDelete: this._deleteMarker,
			onInsert: this._addMarker,
			clearAll: this._clearAll,
		}
		socketDataReplacer.watch("markers", callbacks)
	}
	_clearAll = () => {
		this.markerList.clear()
	}
	_deleteMarker = (id) => {
		const index = this.markerList.findIndex((v) => v.id === id)
		if (index>-1)
			this.markerList.splice(index, 1)
	}
	_addMarker = (addObj) => {
		this.markerList.push(new Marker(addObj))
	}

	update = (id, obj) => {
		const index = this.markerList.findIndex((v) => v.id === id || v.id === -1)
		if (index < 0 && obj) {
			this.markerList.push(new Marker(obj))
		} else if (index >= 0 && !obj) {
			this.markerList.splice(index, 1)
		}
	}

	addMarker = (x, y, color) => {
		socketHandler.emit("insert", {
			collection: "markers",
			newObj: {
				x: x,
				y: y,
				color: color,
			},
		})
	}
	removeMarker = (id) => {
		socketHandler.emit("delete", {
			collection:"markers",
			findObj: {
				_id: id,
			},
		})
	}
}
const markers = new Markers()
export default markers
