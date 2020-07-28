import React, {Component} from "react"
import {BuildingList} from "../../../scripts/kingdom/data/buildings/buildings"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel"
import BuildingHoverTooltip from "./BuildingHoverTooltip"
import {observer} from "mobx-react"

const BuildingGridImprovement=observer(class BuildingGridImprovement extends Component {
	constructor(props) {
		super(props)
		this.divRef = React.createRef()
	}

	buildImprovement = (e) => {
		if (e.target.checked)
			this.props.settlement.addImprovement(this.props.building)
		else
			this.props.settlement.removeImprovement(this.props.building)
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}

	render() {
		return (
			<>
				<div className={"buildingGridImprovementsImprovementWrapper"}
				     ref={this.divRef}>
					<div className={"buildingGridImprovementsImprovement"}>
						<FormControlLabel
							label={this.props.building.name}
							labelPlacement={"top"}
							control={
								<Checkbox
									checked={
										this.props.settlement.hasImprovement(this.props.building)
									}
									onChange={this.buildImprovement}
								/>

							}/>
					</div>
				</div>
				<BuildingHoverTooltip
					building={this.props.building}
					hoverObject={this.divRef}
					noImage={true}
				/>{/*
				<HoverTooltip
					height={400}
					width={600}
					className={"buildingGridFilterTooltip"}
					hoverObject={this.divRef}
				>
					<h1>{this.props.building.name}</h1>
					{Object.keys(this.props.building.bonus).map((key, index)=>{
						return (
						<div className="tooltipField" key={index}>
							<h3>{key}: </h3>
							<h3>{this.props.building.bonus[key]}</h3>
						</div>)
					})}
				</HoverTooltip>*/}
			</>
		)
	}
})

class BuildingGridImprovements extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.improvementList = BuildingList.buildings
			.filter((value => value.size === 0))
	}


	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}

	render() {
		return (
			<div className={"buildingGridImprovements"}>
				{this.improvementList.map((value, index) => {

					return (
						<BuildingGridImprovement
							key={index}
							building={value}
							onBuiltCallback={this.buildImprovement}
							settlement={this.props.settlement}
						/>
					)
				})}
			</div>
		)
	}
}

export default observer(BuildingGridImprovements)