import socketIOClient from "socket.io-client"

class EmitElement {
	constructor(name, data, socket) {
		this.name = name
		this.data = data
		this.socket = socket
		this.emitted = false
	}
	emit() {
		this.socket.emit(this.name, this.data)
		this.emitted = true
	}
}
class EventList {
	constructor() {
		this.callbacks = []
	}
	add(callback, condition) {
		this.callbacks.push(callback)
	}
	remove(callback) {
		this.callbacks.remove(callback)
	}
	invoke(...params) {
		this.callbacks.forEach((callback) => {
			callback(...params)
		})
	}
}
class EventManager {
	constructor() {
		this.events = {}
	}

	addListener(name, callback) {
		const exists = name in this.events
		if (!exists) {
			this.events[name] = new EventList()
		}
		this.events[name].add(callback)
		return exists
	}
	removeListener(name, callback) {
		if (name in this.events) {
			this.events[name].remove(callback)
		}
	}
	invoke = (name) => (...params) => {
		if (name in this.events) {
			this.events[name].invoke(...params)
		}
	}
}
const CONNECT_NAME = "connect"
class SocketHandler {
	constructor() {
		this.socket = socketIOClient()
		this.connected = false
		this.newConnection=true
		this.awaitingEvents = []
		this.eventManager = new EventManager()
		this.on("connect", this._onConnect)
		this.on("disconnect", this._onDisconnect)
	}
	_onConnect = () => {
		this.connected = true
		console.info(`There are ${this.awaitingEvents.length} awaiting events`)
		while (this.awaitingEvents.length > 0) {
			this.awaitingEvents.pop()?.emit()
		}
		if(this.newConnection)
			this.socket.emit("greet", {clientName:"React App"})

	}
	_onDisconnect = () => {
		this.connected = false
	}
	on(name, callback) {
		const createdNew = !this.eventManager.addListener(name, callback)
		if (createdNew) this.socket.on(name, this.eventManager.invoke(name))
		if (name === CONNECT_NAME && this.connected) {
			callback()
		}
	}

	emit(name, data) {
		if (this.connected) {
			this.socket.emit(name, data)
		} else {
			this.awaitingEvents.push(new EmitElement(name, data, this.socket))
		}
	}

	removeListener(name, callback) {
		this.eventManager.removeListener(name, callback)
	}
}



const instance = new SocketHandler()
export default instance
