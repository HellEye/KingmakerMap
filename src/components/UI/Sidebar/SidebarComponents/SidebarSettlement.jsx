import React, {Component} from "react"
import {observe} from "mobx"
import {selectedHex} from "../../../board/HexGrid"
import {selectedKingdom} from "../../../../scripts/kingdom/data/kingdoms"
import "../../../../res/css/Panels/Sidebar/SidebarSettlement.css"
import ConfirmButton from "../../../util/ConfirmButton"

class DistrictElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			district: props.district
		}
	}

	openDistrict = () => {
		this.props.onSelect(this.state.district)
	}
	removeDistrict = ()=>{
		this.props.onDelete(this.state.district.id)
	}

	//some async mess to properly update the list

	render() {
		return (
			<div className={"sidebarSettlementDistrictPanel"}>
				<h4>{this.state.district.id}</h4>
				<input
					type={"button"}
					className={"button"}
					value={"Open"}
					onClick={this.openDistrict}
				/>
				<ConfirmButton
					first={"Delete"}
					second={"Confirm"}
					firstClass={"button sidebarSettlementRemoveButton"}
					secondClass={"button buttonRed sidebarSettlementRemoveButtonConfirm"}
					callback={this.removeDistrict}
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
			if (this._isMounted) {
				this.setState({...this.state, selectedHex: change.newValue})
				/*if(change.newValue.settlement!=null){
					if(this.onDistrictChange)
						this.onDistrictChange()
					if(change.newValue.settlement){
						console.log("Adding district change listener")
						this.onDistrictChange=observe(change.newValue.settlement, "districts", districtChange=>{
							this.forceUpdate()
						})
					}
				}*/
			}
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
		/*if(this.onDistrictChange)
			this.onDistrictChange()*/
	}

	addDistrict = () => {
		this.state.selectedHex.settlement.addDistrict()
		this.forceUpdate()
	}

	addSettlement = () => {
		this.state.selectedHex.createSettlement()
		this.forceUpdate()
	}
	removeDistrict = (id) => {
		if (this.state.selectedHex == null) return
		this.state.selectedHex.settlement.deleteDistrict(id)
			.then(() => {
				this.props.onDistrictRemoved(id)
				this.forceUpdate()
			})
	}

	selectDistrict = (district) => {
		this.props.onDistrictSelect(district)
	}

	getDistrictElementList = ()=>{
		return this.state.selectedHex.settlement.districts.map((value, index) =>
			<DistrictElement
				district={value}
				key={value.id}
				number={index}
				onSelect={this.selectDistrict}
				onDelete={this.removeDistrict}
			/>
		)
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
					{this.getDistrictElementList()}
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