import React, {Component} from "react"
import "../../../res/css/UI/Sidebar.css"

class SidebarElement extends Component {
    render(){
        return (
            <div className={"sidebarElement"}>{this.props.text}</div>
        )
    }
}

export default SidebarElement