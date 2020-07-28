import openSocket from "socket.io-client"

class Settings {
	address = "79.110.201.49"
	sitePort = "3000"
	dbPort = "8255"
	constructor() {
		console.warn("I'm aware of this warning, not my fault socket.io isn't updated yet")
		this.socket=openSocket(`http://${this.address}:${this.dbPort}`, {cookie:false})
	}
}

const instance = new Settings()
export default instance