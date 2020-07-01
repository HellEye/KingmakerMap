import React, {Component} from "react"
import "../../../res/css/Panels/Sidebar/Sidebar.css"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import {observer} from "mobx-react"
import {selectedHex} from "../../board/HexGrid"
import {observe} from "mobx"
import SidebarSettlement from "./SidebarComponents/SidebarSettlement"

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
		this.selectHex = observe(selectedHex, (change) => {
			if (this._isMounted)
				this.setState({...this.state, selectedHex: change.newValue})
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.selectHex()
	}

	/*handleChange = (panel) => (event, isExpanded) => {
		if (isExpanded)
			this.setState(state => {
				state.expanded.push(panel)
				return {expanded:state.expanded}
			});
		else
			this.setState(state => {
				const newExpanded = state.expanded.filter((e)=>e===panel)
				return {expanded:newExpanded}
			})
	}*/


	panelStyle = {
		backgroundColor: "#05386e",
		color: "#a8acb2"
	}
	labelStyle = {
		color: "#a8acb2",
		size: "0.5em"
	}


	render() {
		return (
			<div className={"sidebar"}>
				<h3>Selected hex:</h3>
				<h3>
					{
						this.state.selectedHex != null ?
							`x:${this.state.selectedHex.x}, y:${this.state.selectedHex.y}` : ""
					}
				</h3>
				<div className={"sidebarPanels"}>
					<ExpansionPanel
						// onChange={this.handleChange(1)}
						// expanded={this.state.expanded.includes(1)}
						style={this.panelStyle}>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon style={{stroke: "#052a52", fill: "#052a52"}}/>}
							id="sidebarPanel1"
							style={this.labelStyle}>
							<h4 className={"sidebarPanelHeader"}>Hex improvements</h4>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails style={{flexDirection: "column"}}>
							<h2>Hex improvement stuff</h2>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						// onChange={this.handleChange(2)}
						// expanded={this.state.expanded.includes(2)}
						style={this.panelStyle}>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon style={{stroke: "#052a52", fill: "#052a52"}}/>}
							id="sidebarPanel2"
							style={this.labelStyle}>
							<h4 className={"sidebarPanelHeader"}>Settlement</h4>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails style={{
								flexDirection: "column",
								padding:"5px 5px 15px",
							}}>
							<SidebarSettlement/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</div>
			</div>

		)
	}
}

export default observer(Sidebar)