import React, {Component} from "react"
import {ImprovementList} from "../../../../scripts/kingdom/data/hexImprovements/ImprovmentsMilo"
import Checkbox from "@material-ui/core/Checkbox/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel"
import "../../../../res/css/Panels/Sidebar/SidebarHex.css"
import {TerrainList} from "../../../../scripts/kingdom/data/hexImprovements/TerrainMilo"
import SidebarHexImprovementTooltip from "./SidebarHexImprovementTooltip"

class SidebarHexImprovement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			built: props.hexData.hasImprovement(props.improvement),
			hovering: false,
		}
		this.ref = React.createRef()

	}

	buildImprovement = (event) => {
		if (event.target.checked) {
			const built = this.props.hexData
				.addImprovement(this.props.improvement, this.props.cost)
			this.setState({
				built: built,
			})
		} else {
			this.props.hexData.removeImprovement(this.props.improvement)
			this.setState({
				built: false,
			})
		}
	}

	render() {
		return (
			<>
				<div className={"sidebarHexImprovement"}
				     ref={this.ref}
				>
					<FormControlLabel
						label={this.props.improvement.name + (this.props.improvement.single ? "*" : "")}
						labelPlacement={"start"}
						control={
							<Checkbox
								checked={this.state.built || false}
								onChange={this.buildImprovement}
							/>

						}/>

				</div>
				<SidebarHexImprovementTooltip
					improvement={this.props.improvement}
					cost={this.props.cost}
					hoverObject={this.ref}
				/>
			</>
		)
	}
}

class SidebarHexImprovements extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}


	render() {
		return (
			<div className={"sidebarHexImprovements"}>
				{this.props.terrain ? this.props.terrain.canBuild.concat(TerrainList.extraImprovements).map(value => {
						const improvement = ImprovementList.getByType(value.improvement)
						return <SidebarHexImprovement
							key={improvement.id}
							improvement={improvement}
							cost={value.cost}
							hexData={this.props.hexData}
							terrain={this.props.terrain}
						/>
					},
				) : ""}
			</div>
		)
	}
}

export default SidebarHexImprovements