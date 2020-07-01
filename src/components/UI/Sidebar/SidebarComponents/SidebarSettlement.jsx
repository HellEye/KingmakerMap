import React, {Component} from "react"
import {observe} from "mobx"
import {selectedHex} from "../../../board/HexGrid"
import {selectedKingdom} from "../../../../scripts/kingdom/data/kingdoms"
import "../../../../res/css/Panels/Sidebar/SidebarSettlement.css"

class DistrictElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			district: props.district
		}
	}

	openDistrict = () => {

	}

	render() {
		return (
			<div className={"sidebarSettlementDistrictPanel"}>
				<h4>{this.props.number}</h4>
				<input
					type={"button"}
					className={"button"}
					value={"Open"}
					onClick={this.openDistrict}
				/>
			</div>
		)
	}

}

class SidebarSettlement extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedHex: null,
			selectedKingdom: null
		}
	}

	componentDidMount() {
		this._isMounted = true;
		this.changeHex = observe(selectedHex, (change) => {
			if (this._isMounted)
				this.setState({...this.state, selectedHex: change.newValue})
		})
		this.changeKingdom = observe(selectedKingdom, (change) => {
			if (this._isMounted)
				this.setState({...this.state, selectedKingdom: change.newValue})
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.changeHex()
		this.changeKingdom()
	}

	addDistrict=()=>{
		this.state.selectedHex.settlement.addDistrict()
		this.forceUpdate()
	}

	addSettlement=()=>{
		this.state.selectedHex.createSettlement()
		this.forceUpdate()
	}

	render() {
		if (this.state.selectedKingdom == null) {
			return (
				<div className={"sidebarSettlement"}>
					<h3>No kingdom selected</h3>
				</div>)
		}
		if (this.state.selectedHex == null) {
			return (
				<div className={"sidebarSettlement"}>
					<h3>Select a hex first</h3>
				</div>)
		}
		if (this.state.selectedHex.settlement == null) {
			return (
				<div className={"sidebarSettlement"}>
					<h3>No settlement on this hex</h3>
					<input
						type={"button"}
						className={"sidebarCreateSettlement button"}
						onClick={this.addSettlement}
						value={"Create"}
					/>
				</div>
			)
		}
		return (
			<div className={"sidebarSettlement"}>
				<h3>{this.state.selectedHex.settlement.name === "" ? "Unnamed settlement" : this.state.selectedHex.settlement.name}</h3>
				<div className={"sidebarSettlementDistrictList"}>
					{this.state.selectedHex.settlement.districts.map((value, index)=>{
						return <DistrictElement
							district={value}
							key={index}
							number={index}
						/>
					})}
				</div>
				<input
					type={"button"}
					className={"button"}
					value={"Create new district"}
					onClick={this.addDistrict}
					/>
			</div>
		)
	}
}

export default SidebarSettlement