import React, {Component} from "react"
import {edicts} from "../../../scripts/kingdom/data/kingdomData"

const phases = [
	{
		name: "Upkeep",
		description: [
			"Check stability",
			"Pay consumption",
			"Fill magic items",
			"Modify unrest"],
		extra: (kingdomData, settlement) => {
			return (
				<>
					<h3>Stability:
						beat {Math.floor(kingdomData.getControlDC() - kingdomData.stability - kingdomData.data.stability - settlement.stability)} on
						d20
					</h3>
					<h3>Holiday edict consumption: {edicts.holidayEdict[kingdomData.data.holidayEdict].consumptionDie}</h3>
					<h3>Expansion edict consumption: {edicts.expansionEdict[kingdomData.data.expansionEdict].consumptionDie}</h3>
				</>
			)
		},
	},
	{
		name: "Edict",
		description: [
			"Assign leadership",
			"Claim and abandon hexes",
			"Build terrain improvements",
			"Create and improve settlements",
			"  or Create army units",
			"Issue edicts"],
		extra: (kingdomData, settlement) => {
			return (
				<>
					<h3>Claim count: {kingdomData.hexClaims}</h3>
					<h3>Improvement count: {kingdomData.newImprovements}</h3>
					<h3>Building count: {kingdomData.newBuildings}</h3>

				</>
			)
		},
	},
	{
		name: "Income",
		description: [
			"Make widthdrawals and deposits",
			"Sell items for BP",
			"Collect taxes"],
		extra: (kingdomData, settlement) => {
			return <>
				<h3>Widthdrawal: {kingdomData.bpCost/2}</h3>
				<h3>Deposit: {kingdomData.bpCost}</h3>
			</>
		},
	},
	{
		name: "Event",
		description: [
			`Go on adventures!`,
		],
		extra: (kingdomData, settlement) => {
			return ""
		},
	},
]

class KingdomStatsTurn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPhase: 0,
			showMore: false,
		}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	nextPhase = () => {
		this.setState({
			currentPhase: (this.state.currentPhase + 1) % phases.length,
		})
	}
	toggleMore = () => {
		this.setState({
			showMore: !this.state.showMore,
		})
	}

	render() {
		const phase = phases[this.state.currentPhase]
		const {kingdomData, settlement} = this.props
		return (
			<div className={"kingdomStatsTurn"}>
				<h3>Phase: {phase.name}</h3>
				{phase.description.map((v, i) => (
					<h4 key={i}>{v}</h4>
				))
				}
				<div className={"kingdomStatsTurnButtons"}>
					<input
						type={"button"}
						className={"button buttonGrey"}
						onClick={this.nextPhase}
						value={"Next phase"}
					/>
					<input
						type={"button"}
						className={"button buttonGrey"}
						value={"More"}
						onClick={this.toggleMore}
					/>
				</div>
				{this.state.showMore ?
					<div className={"kingdomStatsTurnMore"}>
						{phase.extra(kingdomData, settlement)}
					</div>
					: ""}
			</div>
		)
	}
}

export default KingdomStatsTurn