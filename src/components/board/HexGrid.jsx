import React, {Component} from "react"
import Hex from "./Hex"
import {hexDataGrid} from "../../scripts/kingdom/data/hexData"
import {observer} from "mobx-react"
import {observable} from "mobx"

let selectedHex = observable.box(null)

class HexGrid extends Component {
	//Magic numbers, do not touch
	hexSize = 228
	margin = 0.7

	loadComplete = false
	hexes = []

	selectHex = (hex) => {
		selectedHex.set(hex)
	}
	createHexes = () => {
		if (!this.loadComplete && hexDataGrid.loaded) {
			this.hexes = []
			for (let y = 0; y < 11; y++) {
				for (let x = 0; x < (y % 2 === 1 ? 27 : 28); x++) {
					this.hexes.push(<Hex
						key={y * 28 + x}
						size={this.hexSize}
						margin={this.margin}
						coords={{x: x, y: y}}
						selectHex={this.selectHex}
						hexData={hexDataGrid.getByCoords(x, y)}
					/>)
				}
			}
			this.loadComplete = true;
		}
	}

	render() {
		this.createHexes()
		return (
			<div style={{position: "absolute", top: 0, left: 0}}>
				{this.hexes}
			</div>
		)
	}
}

export default observer(HexGrid)
export {selectedHex}