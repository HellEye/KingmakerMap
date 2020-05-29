import SidebarElement from "./SidebarElement"
import DisplaySettings from "../../../scripts/settings/DisplaySettings"

class SettingsSidebarElement extends SidebarElement{
	constructor(props){
		super(props)
		this.text="Settings"
		this.onClick = this.onClickHandler
	}
	onClickHandler = () => {
		console.log(DisplaySettings.drawHexes)
		DisplaySettings.drawHexes=!DisplaySettings.drawHexes
		console.log(DisplaySettings.drawHexes)
	}
}
export default SettingsSidebarElement