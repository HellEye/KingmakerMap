import React, {Component} from "react";
import Hex from "./Hex";

class HexGrid extends Component {
    //Magic numbers, do not touch
    hexSize = 228;
    margin=0.7;

    constructor(props) {
        super(props);
        this.hexes = Array.from(new Array(28*11), (val, index) => ({x: index%28, y:Math.floor(index/28)}))
            .map(num => <Hex key={num.x+num.y*29} size={this.hexSize} margin={this.margin} coords={num} style={{stroke: "blue"}} dragData={this.props.dragData}/>);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !nextProps.dragData.dragging;
    }

    render() {
        return (
            <div style={{position: "absolute", top:0, left:0}}>
                {this.hexes}
            </div>
        )
    }
}

export default HexGrid