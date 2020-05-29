import React, {Component} from "react"
import Hex from "./Hex"
import HexData from "../../scripts/kingdom/data/hexData"

class HexGrid extends Component {
	//Magic numbers, do not touch
	hexSize = 228
	margin = 0.7

	hexDataList = []
    loadHexData(){
	    this.hexDataList=Array.from(new Array(28*11),
            (val, index) => new HexData(index)
        )
    }
	constructor(props) {
		super(props)
        this.loadHexData()
		this.hexes =
            Array.from(new Array(28 * 11),
                (val, index) => ({
                    x: index % 28, y: Math.floor(index / 28)
                }))
			.map(num => <Hex key={num.x + num.y * 29}
                             size={this.hexSize}
                             margin={this.margin}
                             coords={num}
			                 style={{stroke: "blue"}}
                             dragData={this.props.dragData}
			                 hexData={this.hexDataList[num.x + num.y * 29]}
            />)
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return !nextProps.dragData.dragging
	}

	render() {
		return (
			<div style={{position: "absolute", top: 0, left: 0}}>
				{this.hexes}
			</div>
		)
	}
}

export default HexGrid