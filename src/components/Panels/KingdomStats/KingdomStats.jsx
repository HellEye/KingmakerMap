import React, {Component} from "react"
import {observer} from "mobx-react"
import "../../../res/css/Panels/KingdomStats.css"
import KingdomStatsSelect from "./KingdomStatsSelect"
import {Accumulator, hexDataGrid} from "../../../scripts/kingdom/data/hexData"

class KingdomStats extends Component {

	constructor(props) {
		super(props);
		this.state = {
			kingdom: null,
			modifiers: new Accumulator()
		}
	}

	hexes = []

	setKingdom = (newKingdom) => {
		if (this.state.kingdom != null && newKingdom.id === this.state.kingdom.id)
			return
		this.setState({kingdom: newKingdom})
		this.hexes = hexDataGrid.getByKingdom(newKingdom.id)
		this.setState({
			modifiers: this.hexes.reduce((acc, value) => {
				return value.getSettlementModifiers(acc)
			}, new Accumulator())
		})
	}

	render() {
		if (this.state.kingdom == null)
			return (
				<div className={"kingdomStats"}>
					<div style={{gridArea: "select"}}>
						<KingdomStatsSelect callback={this.setKingdom}/>
					</div>
				</div>
			)
		return (
			//TODO refactor this mess somehow
			<div className={"kingdomStats"}>
				<div style={{gridArea: "select"}}>
					<h6>This will move</h6>
					<KingdomStatsSelect callback={this.setKingdom}/>
				</div>
				<div style={{gridArea: "stability"}}>
					<h5>Stability</h5>
					<h4>{this.state.kingdom.kingdomData.getStabilityMod() + this.state.modifiers.stability}</h4>
				</div>
				<div style={{gridArea: "loyalty"}}>
					<h5>Loyalty</h5>
					<h4>{this.state.kingdom.kingdomData.getLoyaltyMod() + this.state.modifiers.loyalty}</h4>
				</div>
				<div style={{gridArea: "economy"}}>
					<h5>Economy</h5>
					<h4>{this.state.kingdom.kingdomData.getEconomyMod() + this.state.modifiers.economy}</h4>
				</div>
				<div style={{gridArea: "treasury"}}>
					<h3>{this.state.kingdom.kingdomData.data.treasury} BP</h3>
				</div>
				<div style={{gridArea: "size"}}>
					<h5>Size</h5>
					<h4> {this.state.kingdom.kingdomData.data.size}</h4>
				</div>
				<div style={{gridArea: "unrest"}}>
					{this.state.kingdom.kingdomData.data.unrest > 0 ? (
							<h3>this.state.kingdom.kingdomData.getStabilityMod() + " unrest"</h3>) :
						<h3 className={"tempText"}>Unrest [doesn't render if 0]</h3>}
				</div>
				<div style={{gridArea: "consumption"}}>
					<h3>Consumption: {this.state.kingdom.kingdomData.data.consumption}</h3>
				</div>
				<div style={{gridArea: "empty2"}}>
					<h3 className={"tempText"} >[Probably build point add/subtract]</h3>
					<h3 className={"tempText"}>[Or some other simple control thing]</h3>
				</div>

				<div style={{gridArea: "nav"}}>
					<h3 className={"tempText"}>[Some nav buttons]</h3>
				</div>

				<div style={{gridArea: "empty"}}>
					<h3 className={"tempText"}>[empty or more nav or something?]</h3>
				</div>

			</div>
		)
	}
}

export default observer(KingdomStats)