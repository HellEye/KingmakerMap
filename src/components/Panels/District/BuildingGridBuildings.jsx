import React, {Component} from "react"
// const bgImage = require("../../../res/img/BuildingGridBG.png")
class BuildingGridSquare extends Component{
	constructor(props) {
		super(props);
		this.state={}
	}

	onSelect=(e)=>{
		this.props.onSelect(this.props.i, this.props.j)
	}
	render(){
		return (
			<div
				key={4*this.props.i+this.props.j}
				onClick={this.onSelect}
				className={"buildingGridBuildingsGridSquare "+(this.props.selected?"buildingGridBuildingsGridSquare_selected":"")}
			>
				{`${this.props.i} ${this.props.j}`}
			</div>
		)
	}

}
class BuildingGridBuildings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected:{
				i:-1,
				j:-1,
			},
		}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	selectSquare=(i, j)=>{
		this.setState({
			...this.state,
			selected:{
				i:i,
				j:j,
			}
		})
	}

	render() {
		return (
			<div className={"buildingGridBuildings"}>
				{/*<img src={bgImage} alt={""} className={"buildingGridBuildingsImage"}/>*/}
				<div className={"buildingGridBuildingsGrid"}>
					{[...Array(9).keys()].map(i=>{
						return <div key={i} className={"buildingGridBuildingsGridInner"}>
							{[...Array(4).keys()].map(j=>{
								return <BuildingGridSquare
									i={i}
									j={j}
									selected={this.state.selected.i===i && this.state.selected.j===j}
									onSelect={this.selectSquare}
								/>
							})}
						</div>
					})}
				</div>
			</div>
		)
	}
}

export default BuildingGridBuildings