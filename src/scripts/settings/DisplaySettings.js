import { makeObservable, observable} from "mobx"

class DisplaySettings {
	
	drawHexes = true

}

const instance = new DisplaySettings()
makeObservable(instance, {
	drawHexes: observable,
})

export default instance
