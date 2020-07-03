import React, {Component} from "react"
import "../../../res/css/Panels/BuildingGrid/BuildingGrid.css"
import BuildingFilter from "./BuildingFilter"
import BuildingGridBuildings from "./BuildingGridBuildings"

class BuildingGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	onBuildingSelect = (building) => {

	}

	render() {
		return (
			<div className={"buildingGrid"}>
				<h1>Selected district: {
					this.props.selectedDistrict != null ?
						this.props.selectedDistrict.id : "Error"}
				</h1>
				<BuildingGridBuildings
				/>
				<div className={"buildingGridImprovements"}>

				</div>
				<div className={"buildingGridDetails"}>

				</div>
				<BuildingFilter
					onSelect={this.onBuildingSelect}
				/>

			</div>
		)
	}
}

export default BuildingGrid