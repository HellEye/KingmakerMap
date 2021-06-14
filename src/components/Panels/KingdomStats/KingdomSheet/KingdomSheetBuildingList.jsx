import React, {Component} from "react"
import {observer} from "mobx-react"
import hexDataGrid from "../../../../scripts/kingdom/data/hexes/HexDataGrid"
import BuildingHoverTooltip from "../../District/BuildingHoverTooltip"
import SidebarHexImprovementTooltip from "../../../UI/Sidebar/SidebarComponents/SidebarHexImprovementTooltip"

const KingdomSheetBuilding = observer(class KingdomSheetBuilding extends Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.divRef = React.createRef()
	}

	render() {
		const building = this.props.building
		const count = this.props.count
		return (
			<>
				<div
					ref={this.divRef}
					className={"kingdomSheetBuildingListBuilding"}>
					<h3>{building.name}</h3>
					<h3>{count}</h3>
					<h4>{building.bpCost ? (building.bpCost * count) : "~"}</h4>
					<h4>{building.bonus.stability * count}</h4>
					<h4>{building.bonus.loyalty * count}</h4>
					<h4>{building.bonus.economy * count}</h4>
					<h4>{building.bonus.unrest * count}</h4>
				</div>

				{building.single !== undefined
					? <SidebarHexImprovementTooltip
						improvement={building}
						hoverObject={this.divRef}
					/>
					: <BuildingHoverTooltip
						hoverObject={this.divRef}
						building={building}
						noImage={building.image === undefined}
					/>
				}

			</>
		)
	}
})

class KingdomSheetBuildingList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sortField: "",
			sortReverse: false,
		}
		this.buildingCount = Object
			.entries(hexDataGrid.getBuildingCountByKingdomId(this.props.kingdom.id))
			.map(([key, value]) => {
				return value
			})
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}


	sortBy = (field) => (event) => {
		let sortReverse =
			field === this.state.sortField
				? !this.state.sortReverse
				: false
		if (field === "name") {
			this.buildingCount.sort((a, b) => sortReverse
				? (a.building.name < b.building.name ? 1 : (b.building.name < a.building.name ? -1 : 0))
				: (a.building.name > b.building.name ? 1 : (b.building.name > a.building.name ? -1 : 0)))

		} else if (field === "bpCost") {
			this.buildingCount.sort((a, b) => sortReverse
				? (((b.building.bpCost || 0) * b.count) - ((a.building.bpCost || 0) * a.count))
				: (((a.building.bpCost || 0) * a.count) - ((b.building.bpCost || 0) * b.count)))
		} else if (field === "count") {
			this.buildingCount.sort((a, b) => sortReverse
				? b.count - a.count
				: a.count - b.count)
		} else {
			this.buildingCount.sort((a, b) => sortReverse
				? (b.building.bonus[field] * b.count - a.building.bonus[field] * a.count)
				: (a.building.bonus[field] * a.count - b.building.bonus[field] * b.count))
		}
		this.setState({
			sortField: field,
			sortReverse: sortReverse,
		})
		this.forceUpdate()
	}


	render() {
		return (
			<div className={"kingdomSheetBuildingList"}>
				<div className={"kingdomSheetBuildingListBuilding kingdomSheetBuildingListBuildingHeader"}>
					<h3 onClick={this.sortBy("name")}>Name</h3>
					<h3 onClick={this.sortBy("count")}>Quantity</h3>
					<h4 onClick={this.sortBy("bpCost")}>Value</h4>
					<h4 onClick={this.sortBy("stability")}>Stability</h4>
					<h4 onClick={this.sortBy("loyalty")}>Loyalty</h4>
					<h4 onClick={this.sortBy("economy")}>Economy</h4>
					<h4 onClick={this.sortBy("unrest")}>Unrest</h4>
				</div>
				{this.buildingCount.map((v) => {
					return <KingdomSheetBuilding
						building={v.building}
						count={v.count}
						key={v.building.name}
					/>
				})}
			</div>
		)
	}
}

export default observer(KingdomSheetBuildingList)