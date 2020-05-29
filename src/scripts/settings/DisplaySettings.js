import {decorate, observable} from "mobx"

class DisplaySettings {
	drawHexes = true
	playerColor = "#5090cc"

}

decorate(DisplaySettings, {
	drawHexes: observable,
	playerColor: observable
})
const instance = new DisplaySettings()

export default instance
