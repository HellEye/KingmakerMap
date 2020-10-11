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
import {observer} from "mobx-react"
import KingdomSheetEdict from "./KingdomSheetEdict"
import DropdownSelect from "../../../util/DropdownSelect"
import KingdomSheetBuildingList from "./KingdomSheetBuildingList"


const statsToDisplay = [
	{name: "Stability", value: "stability"},
	{name: "Loyalty", value: "loyalty"},
	{name: "Economy", value: "economy"},
	{name: "Consumption modifier", value: "consumption"},
	{name: "Unrest", value: "unrest"},
	{name: "Control DC Modifier", value: "controlDCMod"},
	{name: "Extra BP/turn", value: "extraBP"},
]
const leaders = [
	{name: "Ruler", value: "ruler", extra: "rulerSelectedAttributes", extraMultiple: true},
	{name: "Consort", value: "consort", attribute: "Loyalty"},
	{name: "Councilor", value: "councilor", attribute:"Loyalty"},
	{name: "General", value: "general", attribute:"Stability"},
	{name: "Grand Diplomat", value: "grandDiplomat", attribute:"Stability"},
	{name: "Heir", value: "heir", attribute:"Loyalty (1/2)"},
	{name: "High Priest", value: "highPriest", attribute:"Stability"},
	{name: "Magister", value: "magister", attribute:"Economy"},
	{name: "Marshal", value: "marshal", attribute:"Economy"},
	{name: "Royal Enforcer", value: "royalEnforcer", attribute:"Loyalty"},
	{name: "Spymaster", value: "spymaster", extra: "spymasterSelectedAttribute", extraMultiple: false},
	{name: "Treasurer", value: "treasurer", attribute:"Economy"},
	{name: "Viceroy", value: "viceroy", attribute:"Economy (1/2)"},
	{name: "Warden", value: "warden", attribute:"Loyalty"},
]
const edicts = [
	{name: "Taxation", value: "taxationEdict"},
	{name: "Holiday", value: "holidayEdict"},
	{name: "Expansion", value: "expansionEdict"},
	{name: "Recruitment", value: "recruitmentEdict"},
]

class KingdomSheet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			kingdom: null,
		}
	}

	componentDidMount() {
		this._isMounted = true
		if (kingdoms.finishedLoading)
			this.setState({kingdom: selectedKingdom.get()})
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
	changeEdictStats=({name, value})=>{
		if(selectedKingdom.get()==null || selectedKingdom.get().kingdomData==null) return
		selectedKingdom.get().kingdomData.data[name]=parseInt(value)
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
		const settlementBonuses = hexDataGrid.getModifiersByKingdomId(this.state.kingdom.id)
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
							<Tab>Edicts</Tab>
							<Tab>Buildings</Tab>
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
											attribute={val.attribute}
										/>))
								}
							</div>
						</TabPanel>
						<TabPanel>
							<div className={"kingdomSheetStats kingdomSheetEdicts"}>
								<div className={"kingdomSheetEdict"}>
									<h3>Edict</h3>
									<h4 className={"kingdomSheetEdictsDropdownLabel"}>Current</h4>
									<h4 className={"numberField"}>Loyalty</h4>
									<h4 className={"numberField"}>Stability</h4>
									<h4 className={"numberField"}>Economy</h4>
									<h4 className={"otherEffect"}>Other effects</h4>
								</div>
								{edicts.map((val, index)=> (
									<KingdomSheetEdict
										key={index}
										value={val.value}
										name={val.name}
										saveCallback={this.saveKingdomData}
										changeCallback={this.changeEdictStats}
										kingdom={this.state.kingdom}
									/>
								))}

							</div>
						</TabPanel>
						<TabPanel>
							<KingdomSheetBuildingList
								kingdom={this.state.kingdom}
							/>
						</TabPanel>
					</div>
				</Tabs>


			</div>

		)
	}
}

export default observer(KingdomSheet)
