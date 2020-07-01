import React, {Component} from "react"
import "../../../res/css/Panels/Sidebar/Sidebar.css"
import {Link} from "react-router-dom"

class SidebarElement extends Component {

	constructor(props) {
		super(props)
		this.onClick = () => console.log("clicked " + this.props.children)
	}


	render() {
		return (
			<div className={"sidebarElement"}
			     onClick={"href" in this.props ? null : this.onClick}>
				{"href" in this.props ?
					<Link to={this.props.href} onClick={this.onClick}>{this.props.children}</Link> : this.props.children}
			</div>
		)
	}
}

export default SidebarElement