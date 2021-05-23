import React, { Component } from "react"
import "../../../res/css/Panels/Sidebar/Sidebar.css"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import { observer } from "mobx-react"
import { selectedHex } from "../../board/HexGrid"
import { action, autorun, makeObservable, observe } from "mobx"
import SidebarSettlement from "./SidebarComponents/SidebarSettlement"
import SidebarHex from "./SidebarComponents/SidebarHex"
import { selectedKingdom } from "../../../scripts/kingdom/data/kingdoms"

/*const tabs = [
	<SidebarElement key={0} href={"/Map"} onClick={() => console.log("clicked first")}>Map</SidebarElement>,
	<SidebarElement key={1} href={"/Stats"}>Stats</SidebarElement>,
	<SidebarElement key={2} href={"/Kingdoms"}>Kingdom overview</SidebarElement>,
]*/
class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded: [],
			selectedHex: null
		}
	}

	componentDidMount() {
		this._isMounted = true
		autorun(() => {
			this.setState({ selectedHex: selectedHex.get() })
		})
		autorun(()=>{
			this.setState({selectedKingdom:selectedKingdom.get()})
		})
	}

	componentWillUnmount() {
		this._isMounted = false
		this.selectHex()
	}

	panelStyle = {
		backgroundColor: "#05386e",
		color: "#a8acb2"
	}
	labelStyle = {
		color: "#a8acb2",
		size: "0.5em"
	}
	index = 0

	onLabelChange = action((event) => {
		const selectedHex = this.state.selectedHex
		selectedHex.setLabel( event.target.value)
	})
	onLabelBlur = (e) => {
		
	}

	render() {
		return (
			<div className={"sidebar"}>
				<h3>Selected hex:</h3>
				<h3>
					{this.state.selectedHex != null
						? `x:${this.state.selectedHex.x}, y:${this.state.selectedHex.y}`
						: "None"}
				</h3>
				<textarea
					className={"sidebarLabelInput"}
					onChange={this.onLabelChange}
					placeholder={"Label"}
					onBlur={this.onLabelBlur}
					disabled={!this.state.selectedHex}
					rows={5}
					cols={30}
					value={
						this.state.selectedHex != null ? this.state.selectedHex.label : ""
					}
				/>
				<div className={"sidebarPanels"}>
					<Accordion
						// onChange={this.handleChange(1)}
						// expanded={this.state.expanded.includes(1)}
						style={this.panelStyle}
					>
						<AccordionSummary
							expandIcon={
								<ExpandMoreIcon
									style={{ stroke: "#052a52", fill: "#052a52" }}
								/>
							}
							id="sidebarPanel1"
							style={this.labelStyle}
						>
							<h4 className={"sidebarPanelHeader"}>Hex improvements</h4>
						</AccordionSummary>
						<AccordionDetails style={{ flexDirection: "column" }}>
							<SidebarHex selectedHex={this.state.selectedHex} />
						</AccordionDetails>
					</Accordion>

					<Accordion
						// onChange={this.handleChange(2)}
						// expanded={this.state.expanded.includes(2)}
						style={this.panelStyle}
					>
						<AccordionSummary
							expandIcon={
								<ExpandMoreIcon
									style={{ stroke: "#052a52", fill: "#052a52" }}
								/>
							}
							id="sidebarPanel2"
							style={this.labelStyle}
						>
							<h4 className={"sidebarPanelHeader"}>Settlement</h4>
						</AccordionSummary>
						<AccordionDetails
							style={{
								flexDirection: "column",
								padding: "5px 5px 15px"
							}}
						>
							<SidebarSettlement
								settlement={this.state.selectedHex?.settlement}
								selectedHex={this.state.selectedHex}
								selectedKingdom={this.state.selectedKingdom}
								onDistrictSelect={this.props.onDistrictSelect}
								onDistrictRemoved={this.props.onDistrictRemoved}
							/>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		)
	}
}

export default observer(Sidebar)
