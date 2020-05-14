import React, {Component} from "react"
import "../../../res/css/UI/Sidebar.css"
import SidebarElement from "./SidebarElement";

class Sidebar extends Component {

    render() {
        return (
            <div className={"sidebar"}>
                <h3>Sidebar</h3>
                <SidebarElement text={1}/>
                <SidebarElement text={2}/>
                <SidebarElement text={3}/>
                <SidebarElement text={4}/>
            </div>
        )
    }
}

export default Sidebar