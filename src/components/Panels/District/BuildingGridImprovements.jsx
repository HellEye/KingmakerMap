import React, {Component} from "react"
import {BuildingList} from "../../../scripts/kingdom/data/buildings/buildings"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel"
import HoverTooltip from "../../util/HoverTooltip"

class BuildingGridImprovement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			built: props.built,
		}
		this.divRef = React.createRef()
	}

	buildImprovement = (e) => {
		this.setState({
			...this.state,
			built: e.target.checked,
		})
		this.props.onBuiltCallback(this.props.building, e.target.checked)
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
									checked={this.state.built}
									onChange={this.buildImprovement}
								/>

							}/>
					</div>
				</div>
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
				</HoverTooltip>
			</>
		)
	}
}

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
	buildImprovement = (building, value) => {
		if (value)
			this.props.settlement.addImprovement(building)
		else
			this.props.settlement.removeImprovement(building)
		this.forceUpdate()

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
							built={this.props.settlement.settlementImprovements.some(b => b.building.id === value.id)}
						/>
					)
				})}
			</div>
		)
	}
}

export default BuildingGridImprovements