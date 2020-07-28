import React, {Component} from "react"
import {kingdoms} from "../../../../scripts/kingdom/data/kingdoms"
import {selectedHex} from "../../../board/HexGrid"
import DropdownSelect from "../../../util/DropdownSelect"
import {TerrainList} from "../../../../scripts/kingdom/data/hexImprovements/TerrainMilo"
import SidebarHexImprovements from "./SidebarHexImprovements"
import {observer} from "mobx-react"

class SidebarHex extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false

	}
	changeKingdom = (newValue) => {
		const prevData = selectedHex.get().ownedBy = kingdoms.getById(newValue.value)
		selectedHex.get().saveToDb()
	}
	changeTerrain = (newValue) => {
		const newTerrain = TerrainList.getById(newValue.value)
		selectedHex.get().setTerrain(newTerrain)
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
					disabled={selectedHex.get() == null}
					onChange={this.changeKingdom}
					value={
						selectedHex.get() && selectedHex.get().ownedBy ? {
							value: selectedHex.get().ownedBy.id,
							label: selectedHex.get().ownedBy.name,
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
					disabled={selectedHex.get() == null}
					value={
						(selectedHex.get() && selectedHex.get().terrainType) ? {
							value: selectedHex.get().terrainType.id,
							label: selectedHex.get().terrainType.name,
						} : {
							value: 0,
							label: "None",
						}
					}
				/>
				{selectedHex.get() && selectedHex.get().terrainType ?
					<>
						<h3>Improvements:</h3>
						<SidebarHexImprovements
							hexData={selectedHex.get()}
							terrain={selectedHex.get().terrainType}
						/>
					</>
					: ""}
			</div>
		)
	}

}

export default observer(SidebarHex)