import React, {Component} from "react"
import "../../../res/css/Panels/BuildingGrid/BuildingGrid.css"
import BuildingFilter from "./BuildingFilter"
import BuildingGridBuildings from "./BuildingGridBuildings"
import BuildingGridImprovements from "./BuildingGridImprovements"
import {observer} from "mobx-react"

class BuildingGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedBuilding:null,
		}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	onBuildingSelect = (building) => {
		this.setState({
			...this.state,
			selectedBuilding:building
		})
	}
	deselectBuilding=()=>{
		this.setState({
			selectedBuilding:null,
		})
	}

	render() {
		// if(this.state.selectedBuilding!=null)
		// 	console.log(this.state.selectedBuilding)
		return (
			<div className={"buildingGrid"}>
				<h1>Selected district: {
					this.props.selectedDistrict != null ?
						this.props.selectedDistrict.id : "Error"}
				</h1>
				<BuildingGridImprovements
					settlement={this.props.selectedDistrict.settlement}
				/>
				<BuildingGridBuildings
					district={this.props.selectedDistrict}
					selectedBuilding={this.state.selectedBuilding}
					deselectBuilding={this.deselectBuilding}
					onUpgrade={this.onBuildingSelect}
				/>
				{/*<div className={"buildingGridImprovements"}>

				</div>
				<div className={"buildingGridDetails"}>

				</div>*/}
				<BuildingFilter
					onSelect={this.onBuildingSelect}
				/>

			</div>
		)
	}
}

export default observer(BuildingGrid)
