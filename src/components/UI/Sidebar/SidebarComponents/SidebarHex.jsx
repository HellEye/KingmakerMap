import React, { Component } from "react"
import { kingdoms } from "../../../../scripts/kingdom/data/kingdoms"
import DropdownSelect from "../../../util/DropdownSelect"
import { TerrainList } from "../../../../scripts/kingdom/data/hexImprovements/TerrainMilo"
import SidebarHexImprovements from "./SidebarHexImprovements"
import { observer } from "mobx-react"

class SidebarHex extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedHex: undefined
		}
		this.autoruns=[]
		
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	changeKingdom = (newValue) => {
		this.props.selectedHex.setOwnedBy(kingdoms.getById(newValue.value))
	}
	changeTerrain = (newValue) => {
		const newTerrain = TerrainList.getById(newValue.value)
		this.props.selectedHex.setTerrain(newTerrain)
	}

	render() {
		return (
			<div className={"sidebarHexPanel"}>
				<h3>Hex owned by:</h3>
				<DropdownSelect
					options={[{ value: 0, label: "None" }].concat(
						kingdoms.map((value) => {
							return { value: value.id, label: value.name }
						})
					)}
					disabled={this.props.selectedHex == null}
					onChange={this.changeKingdom}
					value={
						this.props.selectedHex && this.props.selectedHex.ownedBy
							? {
									value: this.props.selectedHex.ownedBy.id,
									label: this.props.selectedHex.ownedBy.name
							  }
							: {
									value: 0,
									label: "None"
							  }
					}
				/>
				<h3>Terrain:</h3>
				<DropdownSelect
					options={[{ value: 0, label: "None" }].concat(
						TerrainList.list.map((value) => {
							return { value: value.id, label: value.name }
						})
					)}
					onChange={this.changeTerrain}
					disabled={this.props.selectedHex == null}
					value={
						this.props.selectedHex && this.props.selectedHex.terrainType
							? {
									value: this.props.selectedHex.terrainType.id,
									label: this.props.selectedHex.terrainType.name
							  }
							: {
									value: 0,
									label: "None"
							  }
					}
				/>
				{this.props.selectedHex && this.props.selectedHex.terrainType ? (
					<>
						<h3>Improvements:</h3>
						<SidebarHexImprovements
							hexData={this.props.selectedHex}
							terrain={this.props.selectedHex.terrainType}
						/>
					</>
				) : (
					""
				)}
			</div>
		)
	}
}

export default observer(SidebarHex)
