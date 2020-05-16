import React, {Component} from "react"
import "../../../res/css/UI/Sidebar.css"

class SidebarElement extends Component {
    render(){
        return (
            <div className={"sidebarElement"}
                 onClick={()=>console.log('click')}>{this.props.text}</div>
        )
    }
}

export default SidebarElement