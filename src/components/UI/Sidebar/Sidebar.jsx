import React, {Component} from "react"
import "../../../res/css/Panels/Sidebar.css"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import {observer} from "mobx-react"

class Sidebar extends Component {


	constructor(props) {
		super(props)
		this.state = {
			expanded: -1
		}
	}

	handleChange = (panel) => (event, isExpanded) => {
		if (isExpanded)
			this.setState({
				expanded: panel
			});
		else
			this.setState({
				expanded: -1
			})
	}


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
				<h3 className={"tempText"}> This will be moved to header nav or inside the panels </h3>
				{this.props.children}
				<h3 className={"tempText"}>This will stay</h3>
				<div className={"sidebarPanels"}>
					<ExpansionPanel
						onChange={this.handleChange(0)}
						expanded={this.state.expanded === 0}
						style={this.panelStyle}>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon style={{stroke:"#052a52", fill: "#052a52"}}/>}
							id="sidebarPanel0"
							style={this.labelStyle}>
							<h4 className={"sidebarPanelHeader"}>Nav or something</h4>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails style={{flexDirection:"column"}}>
							<h2>Some stuff?</h2>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						onChange={this.handleChange(1)}
						expanded={this.state.expanded === 1}
						style={this.panelStyle}>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon style={{stroke:"#052a52", fill: "#052a52"}}/>}
							id="sidebarPanel1"
							style={this.labelStyle}>
							<h4 className={"sidebarPanelHeader"}>Hex improvements</h4>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails style={{flexDirection:"column"}}>
							<h2>Hex improvement stuff</h2>
						</ExpansionPanelDetails>
					</ExpansionPanel>

					<ExpansionPanel
						onChange={this.handleChange(2)}
						expanded={this.state.expanded === 2}
						style={this.panelStyle}>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon style={{stroke:"#052a52", fill: "#052a52"}}/>}
							id="sidebarPanel2"
							style={this.labelStyle}>
							<h4 className={"sidebarPanelHeader"}>Settlement</h4>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails style={{flexDirection:"column"}}>
							<h2>District list and stuff</h2>
							<h2>Or create settlement</h2>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</div>
			</div>

		)
	}
}

export default observer(Sidebar)