import React, {Component} from "react"
import HoverTooltip from "../../../util/HoverTooltip"
import {BuildingList} from "../../../../scripts/kingdom/data/buildings/buildings"
import "../../../../res/css/Panels/Sidebar/SidebarHex.css"
class SidebarHexImprovementTooltip extends Component {
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
		const building=this.props.improvement
		return (
			<HoverTooltip
				height={400}
				width={600}
				className={"sidebarHexImprovementTooltip"}
				hoverObject={this.props.hoverObject}
			>
				<h1>{building.name}</h1>
				<div
					style={{
						display: "flex",
					}}>
					<p style={{padding: 20}}>{building.effect}</p>
				</div>
				<div style={{
					display: "flex",
					marginTop: 0,
					width: "100%",
				}}>
					<div className={"sidebarHexImprovementTooltipContainer"}>
						<div>
							<h3>Cost</h3>
							<h3>{this.props.cost}</h3>
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
					</div>
					<div className={"sidebarHexImprovementTooltipContainer"}>
						<div>
							<h3>Unrest</h3>
							<h3>{building.bonus.unrest}</h3>
						</div>
						<div>
							<h3>Consumption</h3>
							<h3>{building.bonus.consumption}</h3>
						</div>
						<div>
							<h3>Extra BP</h3>
							<h3>{building.bonus.bonusBP}</h3>
						</div>
					</div>
				</div>
			</HoverTooltip>
		)
	}
}

export default SidebarHexImprovementTooltip