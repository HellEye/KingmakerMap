import React, {Component} from "react"
import "../../../res/css/Panels/Header.css"
import KingdomStats from "../../Panels/KingdomStats/KingdomStats"

class Header extends Component{
    render(){
        return (
            <div className={"header"}>
                <KingdomStats/>
            </div>
        )
    }
}
export default Header