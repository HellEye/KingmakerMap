import React, {Component} from "react"
import HoverTooltip from "../../util/HoverTooltip"
import {BuildingList} from "../../../scripts/kingdom/data/buildings/buildings"

class BuildingHoverTooltip extends Component {
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


	render() {
		if (!this.props.building)
			return ""
		if (this.props.small) {
			const nameElement = <h1>{this.props.building.name}</h1>
			const height = nameElement.current.offsetHeight
			const width = nameElement.current.offsetWidth
			return (
				<HoverTooltip
					height={height + 20}
					width={width + 20}
					className={"buildingGridFilterTooltip"}
					hoverObject={this.props.hoverObject}
				>
					{nameElement}
				</HoverTooltip>
			)
		}
		const building = this.props.building
		return (
			<HoverTooltip
				height={this.props.noImage ? 350 : 480}
				width={600}
				className={"buildingGridBuildingTooltip"}
				hoverObject={this.props.hoverObject}
			>
				<h1>{building.name}</h1>
				<div
					style={{
						display: "flex",
					}}>
					{this.props.noImage ? "" :
						<div className={"buildingGridBuildingTooltipImageContainer"}>
							<img src={building.image[building.image.length - 1]} alt={""}/>
						</div>}
					<p style={{padding: 20}}>{building.text}</p>
				</div>
				<div style={{
					display: "flex",
					marginTop: 20,
					width: "100%",
				}}>
					<div className={"buildingGridBuildingTooltipContainer"}>
						<div>
							<h3>Cost</h3>
							<h3>{building.bpCost}</h3>
						</div>
						<div>
							<h3>Stability</h3>
							<h3>{building.bonus.stability}</h3>
						</div>
						<div>
							<h3>Loyalty</h3>
							<h3>{building.bonus.loyalty}</h3>
						</div>
						<div>
							<h3>Economy</h3>
							<h3>{building.bonus.economy}</h3>
						</div>
						<div>
							<h3>Unrest</h3>
							<h3>{building.bonus.unrest}</h3>
						</div>
						<div>
							<h3>{building.limit ? "Limit" : ""}</h3>
							<p>
								{building.limit}
							</p>
						</div>
					</div>
					<div className={"buildingGridBuildingTooltipContainer"}>
						<div>
							<h3>{building.special ? "Special" : ""}</h3>
							<p>{building.special}</p>
						</div>
						<div>
							<h3>{building.magicItems ? "Magic items" : ""}</h3>
							<p>{building.magicItems}</p>
						</div>
						<div>
							<h3>{building.discounts.length > 0 ? "Discounts" : ""}</h3>
							<p>{building.discounts.length > 0
								? building.discounts.map((value) => BuildingList.getByType(value).name).join(", ")
								: ""
							}</p>
						</div>
						<div>
							<h3>{building.discountedBy.length > 0 ? "Discounted by" : ""}</h3>
							<p>{building.discountedBy.length > 0 ?
								building.discountedBy.map((value) => BuildingList.getByType(value).name).join(", ")
								: ""
							}</p>
						</div>
						<div>
							<h3>{building.upgradesFrom ? "Upgrades from" : ""}</h3>
							<p>
								{building.upgradesFrom ? building.upgradesFrom.name : ""}
							</p>
						</div>

					</div>
				</div>
			</HoverTooltip>
		)
	}
}

export default BuildingHoverTooltip