import React, {Component} from "react"
import {observer} from "mobx-react"
import "../../../res/css/Panels/KingdomStats.css"
import hexDataGrid from "../../../scripts/kingdom/data/hexes/HexDataGrid"
import { Accumulator } from "../../../scripts/kingdom/data/hexes/Accumulator"
import {selectedKingdom} from "../../../scripts/kingdom/data/kingdoms"
import {observe} from "mobx"
import NumberInput from "../../util/NumberInput"
import {edicts} from "../../../scripts/kingdom/data/kingdomData"
import KingdomStatsTurn from "./KingdomStatsTurn"
// const navArea = (
//
// )

class KingdomStats extends Component {

	constructor(props) {
		super(props);
		this.state = {
			kingdom: null,
			modifiers: new Accumulator(),
			treasuryChange: 0,
		}
		this.bpFieldRef = React.createRef()
	}

	componentDidMount() {
		this._isMounted = true;
		this.selectedKingdomChanged = observe(selectedKingdom, (change) => {
			if (this._isMounted) {
				this.setState({kingdom: change.newValue})
			}
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.selectedKingdomChanged()
	}

	updateTreasuryChange = ({value}) => {
		this.setState({
			...this.state,
			treasuryChange: value,
		})
	}

	updateTreasury = value => event => {
		const lastKingdom = this.state.kingdom
		const currentTreasury = lastKingdom.kingdomData.data.treasury
		lastKingdom.kingdomData.setField("treasury", currentTreasury+(value * this.state.treasuryChange))
		this.setState({
			...this.state,
			kingdom: lastKingdom,
		})
	}

	resetTreasuryInput = (event) => {
		this.bpFieldRef.current.setValue(0)
		this.setState({
			...this.state,
			treasuryChange: 0,
		})

	}
	getExtraBpPerTurn = (buildingBonuses) => {
		const kingdomData = this.state.kingdom.kingdomData
		const divideBy = edicts.taxationEdict[kingdomData.data.taxationEdict].divideBy
		const bonus =
			Math.floor(
				(parseInt(this.state.kingdom.kingdomData.economy)
					+ parseInt(this.state.kingdom.kingdomData.data.economy || 0)
					+ parseInt(buildingBonuses.economy)))


		return {
			calc: `(1d20+${bonus})/${divideBy}+${kingdomData.data.extraBP}`,
			total: `(${Math.floor((bonus + 1) / divideBy + kingdomData.data.extraBP)}
		-${Math.floor((bonus + 20) / divideBy + kingdomData.data.extraBP)})`,
		}
	}


	getModifierDisplay = (fieldName, extraValue, key) => {
		return <div style={{gridArea: fieldName}} key={key}>
			<h5>{fieldName.charAt(0) + fieldName.slice(1)}</h5>
			<h4>
				{Math.floor(parseInt(this.state.kingdom.kingdomData[fieldName])
					+ parseInt(this.state.kingdom.kingdomData.data[fieldName] || 0)
					+ extraValue[fieldName])}
			</h4>
			<h4>
				{this.getDiceDC(fieldName, extraValue)} on d20
			</h4>
		</div>
	}

	getDiceDC = (attribute, settlementBonuses) => {
		const kingdomData = this.state.kingdom.kingdomData
		return Math.floor(kingdomData.getControlDC() - kingdomData[attribute] - kingdomData.data[attribute] - settlementBonuses[attribute])
	}

	saveKingdomData = () => {
		this.state.kingdom.kingdomData.saveToDb()
	}

	render() {
		if (this.state.kingdom == null || this.state.kingdom.kingdomData == null || this.state.kingdom.kingdomData.data == null)
			return (
				<div className={"kingdomStats"}>
					<div style={{gridArea: "select"}}>
						<h3>{this.state.kingdom == null ? "No kingdom selected" : "No kingdom data"}</h3>
					</div>
					{this.props.children}
					{/*{
						(this.state.kingdom != null && (this.state.kingdom.kingdomData == null || this.state.kingdom.kingdomData.data == null)) ?
							<div style={{gridArea: "size"}}>
								<h5>No stats for this kingdom</h5>
								<input type={"button"} className={"button"} style={{fontSize: "0.8em"}}
								       value={"Generate"}
								       onClick={this.generateStatsForThisKingdom}/>
							</div>
							: ""
					}*/}
				</div>
			)

		const settlementBonuses =
			hexDataGrid.getModifiersByKingdomId(this.state.kingdom.id)
		const consumption = this.state.kingdom.kingdomData.consumption
			+ settlementBonuses.consumption
			+ this.state.kingdom.kingdomData.data.consumption
		const kingdomData = this.state.kingdom.kingdomData
		const extraBP = this.getExtraBpPerTurn(settlementBonuses)
		return (
			//TODO refactor this mess somehow
			<div className={"kingdomStats"}>
				<div style={{gridArea: "select"}}>
					<h3>{this.state.kingdom.name}</h3>
				</div>
				{["stability", "loyalty", "economy"].map((value, index) => {
					return this.getModifierDisplay(value, settlementBonuses, index)
				})}
				{/*<div style={{gridArea: "loyalty"}}>
					<h5>Loyalty</h5>
					<h4>{parseInt(this.state.kingdom.kingdomData.loyalty) + parseInt(this.state.kingdom.kingdomData.data.loyalty || 0) + parseInt(this.state.modifiers.loyalty || 0)}</h4>
				</div>
				<div style={{gridArea: "economy"}}>
					<h5>Economy</h5>
					<h4>{parseInt(this.state.kingdom.kingdomData.economy) + parseInt(this.state.kingdom.kingdomData.data.economy || 0) + parseInt(this.state.modifiers.economy || 0)}</h4>
				</div>*/}
				<div style={{gridArea: "treasury"}}>
					<h3>{this.state.kingdom.kingdomData.data.treasury} BP</h3>
					<h4>{extraBP.calc}</h4>
					<h4>{extraBP.total}</h4>
				</div>
				<div style={{gridArea: "size"}}>
					<h5>Size</h5>
					<h4> {this.state.kingdom.kingdomData.size}</h4>
				</div>
				<div style={{gridArea: "unrest"}}>
					{this.state.kingdom.kingdomData.data.unrest + settlementBonuses.unrest > 0 ? (<>
							<h4>Unrest:</h4>
							<h3 style={{color: "#a02222"}}> {this.state.kingdom.kingdomData.data.unrest + settlementBonuses.unrest}</h3>
						</>)
						:
						<h3 className={"tempText"}>Unrest 0</h3>}
				</div>
				<div style={{gridArea: "consumption"}}>
					<h4>Consumption:</h4>
					<h4>
						{Math.max(0, consumption)}
					</h4>
					<h5>
						{kingdomData.getConsumptionExtrasString()}
					</h5>
					{consumption < 0 ? <h4>({consumption})</h4> : ""}
				</div>
				<div style={{gridArea: "bp"}}>
					<NumberInput
						ref={this.bpFieldRef}
						name={"treasury"}
						disableButtons={true}
						value={this.state.treasuryChange}
						className={"kingdomStatsBuildPointsInput"}
						changeCallback={this.updateTreasuryChange}
						onFocus={this.resetTreasuryInput}
						saveCallback={this.saveKingdomData}
					/>
					<div className={"kingdomStatsBpButtons"}>
						<input
							type={"button"}
							className={"button buttonGrey"}
							onClick={this.updateTreasury(1)}
							value={"Add"}
						/>
						<input
							type={"button"}
							className={"button buttonGrey"}
							onClick={this.updateTreasury(-1)}
							value={"Remove"}
						/>
					</div>
				</div>
				<div style={{gridArea: "controlDC"}}>
					<h3>Control DC:</h3>
					<h2>{this.state.kingdom.kingdomData.getControlDC()}</h2>
				</div>
				<div style={{gridArea: "turn"}}>
					<KingdomStatsTurn
						settlement={settlementBonuses}
						kingdomData={this.state.kingdom.kingdomData}
					/>
				</div>
				{this.props.children}

			</div>
		)
	}
}

export default observer(KingdomStats)