import React, {Component} from "react"
import {observe} from "mobx"
import {kingdoms} from "../../../../scripts/kingdom/data/kingdoms"
import {selectedHex} from "../../../board/HexGrid"
import DropdownSelect from "../../../util/DropdownSelect"
import {TerrainList} from "../../../../scripts/kingdom/data/hexImprovements/TerrainMilo"
import SidebarHexImprovements from "./SidebarHexImprovements"

class SidebarHex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hexData: null,
			kingdom: null,
		}
	}

	componentDidMount = () => {
		this._isMounted = true
		/*this.onKingdomChange = observe(selectedKingdom, change => {
			if (this._isMounted)
				this.setState({
					...this.state,
					kingdom: change.newValue
				})
		})*/
		this.onHexChange = observe(selectedHex, change => {
			if (this._isMounted)
				this.setState({
					...this.state,
					hexData: change.newValue,
					kingdom: change.newValue.ownedBy,
					terrain: change.newValue.terrainType,
				})
		})
	}
	componentWillUnmount = () => {
		this._isMounted = false
		this.onHexChange()
		// this.onKingdomChange()
	}
	changeKingdom = (newValue) => {
		const prevData = this.state.hexData
		prevData.ownedBy = kingdoms.getById(newValue.value)
		this.setState({
			...this.state,
			hexData: prevData,
			kingdom: kingdoms.getById(newValue.value),
		})
		this.state.hexData.saveToDb()
	}
	changeTerrain = (newValue) => {
		const newTerrain = TerrainList.getById(newValue.value)
		this.state.hexData.setTerrain(newTerrain)
		this.setState({
			terrain: newValue === 0 ? null : newTerrain,
		})

	}

	render() {
		return (
			<div className={"sidebarHexPanel"}>
				<h3>Hex owned by:</h3>
				<DropdownSelect
					options={[{value: 0, label: "None"}]
						.concat(kingdoms.map((value) => {
							return {value: value.id, label: value.name}
						}))}
					disabled={this.state.hexData == null}
					onChange={this.changeKingdom}
					value={
						this.state.kingdom ? {
							value: this.state.kingdom.id,
							label: this.state.kingdom.name,
						} : {
							value: 0,
							label: "None",
						}}
				/>
				<h3>Terrain:</h3>
				<DropdownSelect
					options={[{value: 0, label: "None"}]
						.concat(TerrainList.list.map((value) => {
							return {value: value.id, label: value.name}
						}))}
					onChange={this.changeTerrain}
					value={
						this.state.terrain ? {
							value: this.state.terrain.id,
							label: this.state.terrain.name,
						} : {
							value: 0,
							label: "None",
						}
					}
				/>
				{this.state.terrain ?
					<>
						<h3>Improvements:</h3>
						<SidebarHexImprovements
							hexData={this.state.hexData}
							terrain={this.state.terrain}
						/>
					</>
					: ""}
			</div>
		)
	}

}

export default SidebarHex