import React, {Component} from "react"
import {BuildingList} from "../../../scripts/kingdom/data/buildings/buildings"
import HoverTooltip from "../../util/HoverTooltip"

class BuildingFilterDisplay extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mouseHover: false,
			mousePosX: 0,
			mousePosY: 0,
		}
		this.divRef = React.createRef()
	}

	onMouseEnter = (event) => {
		this.setState({
			...this.state,
			mouseHover: true,
			mousePosX: event.clientX,
			mousePosY: event.clientY,
		})
	}
	onMouseLeave = (event) => {
		this.setState({
			...this.state,
			mouseHover: false,
		})
	}

	selectBuilding = () => {
		this.props.onSelect(this.props.building)
	}


	render() {
		const {name, bpCost} = this.props.building
		const {stability, loyalty, economy} = this.props.building.bonus
		return (
			<>
				<div ref={this.divRef} className={"buildingGridFilterBuilding"}>
					<h3
						onClick={this.selectBuilding}
						onMouseEnter={this.onMouseEnter}
						onMouseLeave={this.onMouseLeave}>
						{name}
					</h3>
					<h3>{economy || 0}</h3>
					<h3>{loyalty || 0}</h3>
					<h3>{stability || 0}</h3>
					<h3>{bpCost || 0}</h3>

					{/*<MouseTooltip
					visible={this.state.mouseHover}
					offsetX={-600}
					offsetY={this.state.mousePosY+420>window.innerHeight?-410:20}
					style={{
						zIndex:15,
					}}
				>
					<div className={"buildingGridFilterTooltip"}>

					</div>
				</MouseTooltip>*/}
				</div>
				<HoverTooltip
					height={400}
					width={600}
					className={"buildingGridFilterTooltip"}
					hoverObject={this.divRef}
				>
					<h1>{name}</h1>
					<img src={this.props.building.image[this.props.building.image.length - 1]} alt={""}/>
				</HoverTooltip>
			</>
		)
	}
}

class BuildingFilter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sortName: "",
			filterBy: {
				value: "",
				ascending: false,
			},
		}
	}

	buildingList = [...BuildingList.buildings]

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}

	onNameFieldChange = (e) => {
		const newFilter = e.target.value
		this.setState({
			...this.state,
			sortName: newFilter,
		})
	}
	onBuildingSelect = (building) => {
		this.props.onSelect(building)
	}

	getFilteredBuildingList = () => {
		return this.buildingList
			.filter((building) => {
				return building.name.toLowerCase().includes(this.state.sortName) && building.size > 0
			})
			.map((building) => {
				return <BuildingFilterDisplay
					key={building.id}
					building={building}
					onSelect={this.onBuildingSelect}
				/>
			})
	}
	buildingComparator = (fieldName, ascending) => (first, second) => {
		if (!fieldName) return 0;
		if (fieldName === "bpCost")
			return ascending ?
				(first[fieldName] || 0) - (second[fieldName] || 0) : (second[fieldName] || 0) - (first[fieldName] || 0)
		return ascending ?
			(first.bonus[fieldName] || 0) - (second.bonus[fieldName] || 0) : (second.bonus[fieldName] || 0) - (first.bonus[fieldName] || 0)
	}

	changeSorting = (field) => (event) => {
		let newAscending = false
		if (this.state.filterBy.value === field) {
			newAscending = !this.state.filterBy.ascending
			this.setState({
				...this.state,
				filterBy: {
					value: field,
					ascending: !this.state.filterBy.ascending,
				},
			})
		} else {
			this.setState({
				...this.state,
				filterBy: {
					value: field,
					ascending: false,
				},
			})
		}
		this.buildingList = this.buildingList.sort(this.buildingComparator(field, newAscending))
	}

	render() {
		return (
			<div className={"buildingGridFilter"}>
				{/*<div className={"buildingGridFilterTopWrap"}>*/}
				<div className={"buildingGridFilterTop"}>
					<input
						className={"buildingGridFilterText"}
						type={"text"}
						value={this.state.sortName}
						onChange={this.onNameFieldChange}
					/>
					<input
						type={"button"}
						className={"button"}
						value={"Economy"}
						onClick={this.changeSorting("economy")}
					/>
					<input
						type={"button"}
						className={"button"}
						value={"Loyalty"}
						onClick={this.changeSorting("loyalty")}
					/>
					<input
						type={"button"}
						className={"button"}
						value={"Stability"}
						onClick={this.changeSorting("stability")}
					/>
					<input
						type={"button"}
						className={"button"}
						value={"Cost"}
						onClick={this.changeSorting("bpCost")}
					/>
				</div>
				{/*</div>*/}
				<div className={"buildingGridFilterBuildings"}>
					{this.getFilteredBuildingList()}
				</div>
			</div>
		)
	}
}

export default BuildingFilter
