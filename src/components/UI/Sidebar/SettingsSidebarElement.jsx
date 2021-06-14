import SidebarElement from "./SidebarElement"
import DisplaySettings from "../../../scripts/settings/DisplaySettings"

class SettingsSidebarElement extends SidebarElement{
	constructor(props){
		super(props)
		this.text="Settings"
		this.onClick = this.onClickHandler
	}
	onClickHandler = () => {
		DisplaySettings.drawHexes=!DisplaySettings.drawHexes
	}
}
export default SettingsSidebarElement