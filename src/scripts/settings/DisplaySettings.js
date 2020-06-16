import {decorate, observable} from "mobx"

class DisplaySettings {
	drawHexes = true
}

decorate(DisplaySettings, {
	drawHexes: observable,
})
const instance = new DisplaySettings()

export default instance
