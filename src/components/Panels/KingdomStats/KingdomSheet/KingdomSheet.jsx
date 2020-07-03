import React, {Component} from "react"
import KingdomStatsSelect from "../KingdomStatsSelect"
import "../../../../res/css/Panels/KingdomSheet.css"
import {observe} from "mobx"
import KingdomSheetField from "./KingdomSheetField"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs"
import "../../../../res/css/UI/Tabs.css"
import KingdomSheetRuler from "./KingdomSheetRuler"
import {kingdoms, selectedKingdom} from "../../../../scripts/kingdom/data/kingdoms"
import {hexDataGrid} from "../../../../scripts/kingdom/data/hexData"


const statsToDisplay = [
	{name: "Stability", value: "stability"},
	{name: "Loyalty", value: "loyalty"},
	{name: "Economy", value: "economy"},
	{name: "Consumption modifier", value: "consumptionModifier"},
	{name: "Unrest", value: "unrest"}
]
const leaders = [
	{name: "Ruler", value: "ruler", extra: "rulerSelectedAttributes", extraMultiple: true},
	{name: "Consort", value: "consort"},
	{name: "Councilor", value: "councilor"},
	{name: "General", value: "general"},
	{name: "Grand Diplomat", value: "grandDiplomat"},
	{name: "Heir", value: "heir"},
	{name: "High Priest", value: "highPriest"},
	{name: "Magister", value: "magister"},
	{name: "Marshal", value: "marshal"},
	{name: "Royal Enforcer", value: "royalEnforcer"},
	{name: "Spymaster", value: "spymaster", extra: "spymasterSelectedAttribute", extraMultiple: false},
	{name: "Treasurer", value: "treasurer"},
	{name: "Viceroy", value: "viceroy"},
	{name: "Warden", value: "warden"}
]

class KingdomSheet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			kingdom: null
		}
	}

	componentDidMount() {
		this._isMounted = true
		if(kingdoms.finishedLoading)
			this.setState({kingdom:selectedKingdom.get()})
		this.onKingdomChange = observe(selectedKingdom, change => {
			if (this._isMounted)
				this.setState({kingdom: change.newValue})
		})
	}

	componentWillUnmount() {
		this._isMounted = false
		this.onKingdomChange()
	}

	/*selectKingdom = (kingdom) => {
		selectedKingdom.set(kingdom)
	}*/
	generateStatsForThisKingdom = () => {
		selectedKingdom.createKingdomData()
			.then(this.forceUpdate())
	}
	saveKingdomData = () => {
		selectedKingdom.get().kingdomData.saveToDb()
	}

	changeKingdomStats = ({name, value}) => {
		if (selectedKingdom.get() == null || selectedKingdom.get().kingdomData == null) return
		selectedKingdom.get().kingdomData.data[name] = parseInt(value)
		this.forceUpdate()
	}
	changeRulerStats = ({name, value}) => {
		if (selectedKingdom.get() == null || selectedKingdom.get().kingdomData == null) return
		selectedKingdom.get().kingdomData.data.positions[name] = parseInt(value)
		this.forceUpdate()
	}

	render() {
		if (this.state.kingdom == null || this.state.kingdom.kingdomData.data == null)
			return (
				<div className={"kingdomSheet"}>
					<h1 className={"kingdomSheetTitle"}>
						{
							this.state.kingdom == null ?
								"Select kingdom... " : this.state.kingdom.name
						}
					</h1>
					<KingdomStatsSelect style={{gridArea: "KingdomSelect"}}/>
					{this.state.kingdom != null && this.state.kingdom.kingdomData.data == null ?
						(<div style={{gridArea: "KingdomSelect2"}}>
							<h5>No stats for this kingdom</h5>
							<input type={"button"} className={"button"} style={{fontSize: "0.8em"}}
							       value={"Generate"}
							       onClick={this.generateStatsForThisKingdom}
							/>
						</div>)
						: ""}
				</div>
			)
		const settlementBonuses=hexDataGrid.getModifiersByKingdomId(this.state.kingdom.id)
		return (
			<div>
				<Tabs className={"kingdomSheet"}>

					<h3 className={"kingdomSheetTitle"}>
						{
							this.state.kingdom == null ?
								"Select kingdom... " : this.state.kingdom.name
						}
					</h3>
					<KingdomStatsSelect style={{gridArea: "KingdomSelect"}}/>
					<div className={"kingdomSheetTabs"}>
						<TabList>
							<Tab>Stats</Tab>
							<Tab>Leaders</Tab>
						</TabList>
					</div>
					<div className={"kingdomSheetContent"}>
						<TabPanel>
							<div className={"kingdomSheetStats"}>
								<div className={"kingdomSheetField"}>
									<h3>{}</h3>
									<h4>Hex modifiers</h4>
									<h4>Kingdom modifiers</h4>
									<h4>Other</h4>
								</div>
								{
									statsToDisplay.map((val, index) => (
										<KingdomSheetField
											key={index}
											value={val.value}
											name={val.name}
											saveCallback={this.saveKingdomData}
											changeCallback={this.changeKingdomStats}
											kingdom={this.state.kingdom}
											settlementBonuses={settlementBonuses}
										/>))
								}
							</div>
						</TabPanel>
						<TabPanel>
							<div className={"kingdomSheetStats kingdomSheetRulers"}>
								{
									leaders.map((val, index) => (
										<KingdomSheetRuler
											key={index}
											value={val.value}
											number={this.state.kingdom.kingdomData.data.positions[val.value]}
											selected={val.extra != null
												? this.state.kingdom.kingdomData.data.positions[val.extra] : {}}
											name={val.name}
											extra={val.extra}
											extraMultiple={val.extraMultiple}
											saveCallback={this.saveKingdomData}
											changeCallback={this.changeRulerStats}
											kingdom={this.state.kingdom}
										/>))
								}
							</div>
						</TabPanel>
					</div>
				</Tabs>


			</div>

		)
	}
}

export default KingdomSheet
