import React, {Component} from 'react'
import Hexagon from "react-hexagon"
import DisplaySettings from "../../scripts/settings/DisplaySettings"
import {observer} from "mobx-react"

const HexWrapper = observer((props) =>
    <div style={props.divStyle}>
        <Hexagon style={props.hexStyle}/>
    </div>
)


class Hex extends Component {
    static startOffsetX = 25
    static startOffsetY = 6
    hexData=null;
    constructor(props) {
        super(props)
        this.hexData=props.hexData;
        this.renderData = {
            left:
                Hex.startOffsetX + //align to hexes on board
                this.props.coords.x * this.props.size  //offset by the size
                + this.props.coords.y % 2 * this.props.size / 2 //offset by half if on even row
                + this.props.margin * this.props.coords.x, //add a margin between elements
            top:
                Hex.startOffsetY //align to hexes on board
                + this.props.coords.y * this.props.size *0.86 //offset by the size (reduced because of tiling
                + this.props.margin * this.props.coords.y * 1.2 //add margin (with weird multiplier)
        }
        this.style = this.props.style
    }

    getDivStyle() {
        return {
            position: "absolute",
            top: `${this.renderData.top}px`,
            left: `${this.renderData.left}px`,
            width: this.props.size,
            height: this.props.size
        }
    }
    getHexStyle() {
        return Object.assign({}, this.props.style, {
            stroke: (DisplaySettings.playerColor + (DisplaySettings.drawHexes ? "ff" : "00"))
        })
    }

    render() {

        return (
            <HexWrapper divStyle={this.getDivStyle()} hexStyle={this.getHexStyle()}/>
        )

    }
}



export default observer(Hex)