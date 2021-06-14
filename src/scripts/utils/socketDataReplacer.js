import { flatten } from "mongo-dot-notation"
import socketHandler from "./socketHandler"
import _ from "lodash"
class WatchObject {
	constructor(collection, callbacks, findObj) {
		this.collection = collection
		this.findObj = findObj
		this.callbacks = {
			onLoaded: () => {},
			onInsert: () => {},
			onDelete: () => {},
			clearAll: () => {},
			onUpdate: () => {},
		}
		this.callbacks = { ...this.callbacks, ...callbacks }
	}
	synchronize = (data) => {
		if (data.collection !== this.collection) return
		
	
		// console.info(`Received reply to find in ${this.collection}`)
		// console.info(data)
		// if(data.findObj && Object.keys(data.findObj).length===0){
		if (data.causedBy === "connect") {
			if (!_.isEqual(this.findObj, {}) && !_.isEqual(this.findObj, data.findObj))
				return
			this.callbacks.clearAll()
			data.result.forEach((v) => this.callbacks.onInsert(v))
			console.info(`first time load complete for ${data.collection}`)
			if (this.callbacks.onLoaded) {
				this.callbacks.onLoaded()
			}
			return
		} else if (data.causedBy === "update") {
			if (!_.isEqual(this.findObj, {}) && !_.isEqual(this.findObj, data.findObj))
				return
			this.callbacks.onUpdate(data.result[0])
			console.info(
				`Updated element in ${data.collection} at id ${data.result[0]._id}`
			)
		} else if (data.causedBy === "insert") {
			this.callbacks.onInsert(data.result[0])
			console.info(
				`Inserted element in ${data.collection} at id ${data.result[0]._id}`
			)
			return
		} else if (data.causedBy === "delete") {
			this.callbacks.onDelete(data.findObj._id)
			console.info(
				`Deleted element from ${data.collection} at id ${data.findObj._id}`
			)
		}
	}
	
	/* 
	ask = (data) => {
		switch (data.causedBy) {
			case "delete":
				for (let i = this.array.length - 1; i >= 0; i--) {
					if (this.array[i].id === data.result[0]._id) {
						this.array.splice(i, 1)
						console.info(
							`Deleted element from ${data.collection} on id ${data.result[0]._id}`
						)
						break
					}
				}
				break
			case "insert":
			case "update":
				console.info(
					`${data.causedBy} to ${data.collection} on id ${data.result[0]._id} detected`
				)
				socketHandler.emit("find", { _id: data.result[0]._id })
				break
			default:
				console.error(
					"Something went wrong with parsing data.causedBy of socket response"
				)
		}
	} 
	 */
}

class SocketDataReplacer {
	constructor() {
		this.watchList = []
		socketHandler.on("found", this.update)
		socketHandler.on("changed", this.ask)
	}

	watch = (collectionName, callbacks, findObj = {}, loadImmediate = true) => {
		this.watchList.push(new WatchObject(collectionName, callbacks, findObj))
		if (loadImmediate)
			socketHandler.on("connect", () => {
				socketHandler.emit("find", {
					collection: collectionName,
					findObj: findObj,
					causedBy: "connect",
				})
			})
	}

	ask = (data) => {
		if (data.newId) {
			const query = {
				collection: data.collection,
				findObj: { _id: data.newId },
				causedBy: data.operation,
			}
			if (data.causedBy === "update") {
				const flattened = flatten(data.newObj).$set
				if (!flattened) {
					console.warn("error data", data)
				}
				const flattenedFind = flatten(data.findObj).$set
				const projection = {}

				for (let k of Object.keys(flattened)) {
					projection[k] = 1
				}
				for (let k of Object.keys(flattenedFind)) {
					projection[k] = 1
				}
				//TODO check projection
				query.projection = projection
			}
			socketHandler.emit("find", query)
		}
		console.info(data)
		console.info(
			`${data.operation.charAt(0).toUpperCase() + data.operation.slice(1)} to ${
				data.collection
			} detected${data.newId ? "" : ", no id, ignoring"}`
		)
	}

	update = (data) => {
		this.watchList.forEach((e) => {
			e.synchronize(data)
		})
	}
}

const instance = new SocketDataReplacer()
export default instance
