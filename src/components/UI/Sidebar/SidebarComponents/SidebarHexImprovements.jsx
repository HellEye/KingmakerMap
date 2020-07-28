import React, {Component} from "react"
import {ImprovementList} from "../../../../scripts/kingdom/data/hexImprovements/ImprovmentsMilo"
import Checkbox from "@material-ui/core/Checkbox/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel"
import "../../../../res/css/Panels/Sidebar/SidebarHex.css"
import {TerrainList} from "../../../../scripts/kingdom/data/hexImprovements/TerrainMilo"
import SidebarHexImprovementTooltip from "./SidebarHexImprovementTooltip"
import {observer} from "mobx-react"

const SidebarHexImprovement = observer(class SidebarHexImprovement extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef()
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	buildImprovement = (event) => {
		if (event.target.checked) {
			const built = this.props.hexData
				.addImprovement(this.props.improvement, this.props.cost)
		} else {
			this.props.hexData.removeImprovement(this.props.improvement)
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
								checked={this.props.built || false}
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
})

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
							built={this.props.hexData.hasImprovement(improvement)}
							hexData={this.props.hexData}
							terrain={this.props.terrain}
						/>
					},
				) : ""}
			</div>
		)
	}
}

export default observer(SidebarHexImprovements)