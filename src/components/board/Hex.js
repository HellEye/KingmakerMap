import React, {Component} from 'react'
import Hexagon from "react-hexagon"

class Hex extends Component {
    static startOffsetX = 25;
    static startOffsetY = 6;

    constructor(props) {
        super(props);
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
        };
    }

    getStyle() {
        return {
            position: "absolute",
            top: `${this.renderData.top}px`,
            left: `${this.renderData.left}px`,
            width: this.props.size,
            height: this.props.size
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.dragData.dragging;
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <Hexagon style={this.props.style}/>
            </div>
        )

    }
}

export default Hex;