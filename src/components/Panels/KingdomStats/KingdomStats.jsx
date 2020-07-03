import React, {Component} from "react"
import {observer} from "mobx-react"
import "../../../res/css/Panels/KingdomStats.css"
import {Accumulator, hexDataGrid} from "../../../scripts/kingdom/data/hexData"
import {selectedKingdom} from "../../../scripts/kingdom/data/kingdoms"
import {observe} from "mobx"
import NumberInput from "../../util/NumberInput"
// const navArea = (
//
// )

class KingdomStats extends Component {

	constructor(props) {
		super(props);
		this.state = {
			kingdom: null,
			modifiers: new Accumulator(),
			treasuryChange: 0
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

	hexes = []

	setKingdom = (newKingdom) => {
		if (newKingdom == null)
			return
		this.setState({kingdom: newKingdom})
		this.hexes = hexDataGrid.getByKingdom(newKingdom.id)
		this.setState({
			modifiers: this.hexes.reduce((acc, value) => {
				return value.getSettlementModifiers(acc)
			}, new Accumulator())
		})
	}

	updateTreasuryChange = ({value}) => {
		this.setState({
			...this.state,
			treasuryChange: value
		})
	}

	updateTreasury = value => event => {
		const lastKingdom = this.state.kingdom
		lastKingdom.kingdomData.data.treasury += value * this.state.treasuryChange
		this.setState({
			...this.state,
			kingdom: lastKingdom,
		})
	}

	resetTreasuryInput = (event) => {
		this.bpFieldRef.current.setValue(0)

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

		return (
			//TODO refactor this mess somehow
			<div className={"kingdomStats"}>
				<div style={{gridArea: "select"}}>
					<h3>{this.state.kingdom.name}</h3>
				</div>
				<div style={{gridArea: "stability"}}>
					<h5>Stability</h5>
					<h4>{parseInt(this.state.kingdom.kingdomData.getStabilityMod()) + parseInt(this.state.kingdom.kingdomData.data.stability || 0) + parseInt(this.state.modifiers.stability || 0)}</h4>
				</div>
				<div style={{gridArea: "loyalty"}}>
					<h5>Loyalty</h5>
					<h4>{parseInt(this.state.kingdom.kingdomData.getLoyaltyMod()) + parseInt(this.state.kingdom.kingdomData.data.loyalty || 0) + parseInt(this.state.modifiers.loyalty || 0)}</h4>
				</div>
				<div style={{gridArea: "economy"}}>
					<h5>Economy</h5>
					<h4>{parseInt(this.state.kingdom.kingdomData.getEconomyMod()) + parseInt(this.state.kingdom.kingdomData.data.economy || 0) + parseInt(this.state.modifiers.economy || 0)}</h4>
				</div>
				<div style={{gridArea: "treasury"}}>
					<h3>{this.state.kingdom.kingdomData.data.treasury} BP</h3>
				</div>
				<div style={{gridArea: "size"}}>
					<h5>Size</h5>
					<h4> {this.state.kingdom.kingdomData.size}</h4>
				</div>
				<div style={{gridArea: "unrest"}}>
					{this.state.kingdom.kingdomData.data.unrest > 0 ? (
							<h3>this.state.kingdom.kingdomData.getStabilityMod() + " unrest"</h3>) :
						<h3 className={"tempText"}>Unrest [doesn't render if 0]</h3>}
				</div>
				<div style={{gridArea: "consumption"}}>
					<h3>Consumption: {this.state.kingdom.kingdomData.data.consumption}</h3>
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
				<div style={{gridArea:"empty"}}>

				</div>
				{this.props.children}


				{/*<div style={{gridArea: "empty"}}>
					<h3 className={"tempText"}>[empty or more nav or something?]</h3>
				</div>*/}

			</div>
		)
	}
}

export default observer(KingdomStats)