import React, { Component } from "react"
import Hex from "./Hex"
import hexDataGrid from "../../scripts/kingdom/data/hexes/HexDataGrid"
import { observer } from "mobx-react"
import { action, makeObservable, observable, when } from "mobx"

class SelectedHex {
	constructor(){
		this.selectedHex=null
		this.previousHex=null
		makeObservable(this, {selectedHex:observable})
	}
	get=()=>{
		return this.selectedHex
	}
	set=(hex)=>{
		this.previousHex=this.selectedHex
		this.selectedHex=hex
	}
}
let selectedHex = new SelectedHex()

const maxX = 30
const maxY = 11
class HexGrid extends Component {
	//Magic numbers, do not touch
	

	constructor(props) {
		super(props)

		this.hexSize = 228
		this.margin = 0.7
		this.hexDataGrid = hexDataGrid
		this.hexes = []
		this.state = {
			loaded: false
		}
		when(
			() => hexDataGrid.loaded,
			() => {
				this.createHexes()
				this.setState({ loaded: true })
			}
		)
	}
	selectHex = action((hex) => {
		selectedHex.set(hex)
	})
	createHexes = () => {
		this.hexes = []
		for (let y = 0; y < maxY; y++) {
			for (let x = 0; x < (y % 2 === 1 ? maxX - 1 : maxX); x++) {
				this.hexes.push(
					<Hex
						key={y * maxX + x}
						size={this.hexSize}
						margin={this.margin}
						coords={{ x: x, y: y }}
						selectHex={this.selectHex}
						hexData={hexDataGrid.getByCoords(x, y)}
					/>
				)
			}
		}
	}

	render() {
		return (
			<>
				{this.state.loaded ? (
					<div style={{ position: "absolute", top: 0, left: 0 }}>
						{this.hexes}
					</div>
				) : (
					""
				)}
			</>
		)
	}
}

export default observer(HexGrid)
export { selectedHex }
