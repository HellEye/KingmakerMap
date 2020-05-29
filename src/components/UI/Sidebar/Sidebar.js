import React, {Component} from "react"
import "../../../res/css/UI/Sidebar.css"
import {observer} from "mobx-react"

class Sidebar extends Component {



	render() {
		return (
			<div className={"sidebar"}>
				{this.props.children}
			</div>
		)
	}
}

export default observer(Sidebar)