import React, { Component } from "react"
import { action, makeObservable, observe } from "mobx"
import { selectedHex } from "../../../board/HexGrid"
import { selectedKingdom } from "../../../../scripts/kingdom/data/kingdoms"
import "../../../../res/css/Panels/Sidebar/SidebarSettlement.css"
import ConfirmButton from "../../../util/ConfirmButton"
import { observable } from "mobx"
import { observer } from "mobx-react"
const selectedDistrict = observable.box(null)
const DistrictElement=observer(class DistrictElement extends Component {
	

	openDistrict = () => {
		this.props.onSelect(this.props.district)
	}
	removeDistrict = () => {
		this.props.onDelete(this.props.district.id)
	}
	changeDistrictName = (e) => {
		this.props.district.setName(e.target.value)
	}

	//some async mess to properly update the list

	render() {
		return (
			<div className={"sidebarSettlementDistrictPanel"}>
				<input
					type="text"
					className="sidebarSettlementNameInput"
					value={this.props.district.name}
					onChange={this.changeDistrictName}
				/>

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
})

class SidebarSettlement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedKingdom: null,
		}
		makeObservable(this, {
			onSettlementNameChange: action,
		})
	}

	componentDidMount() {
		this._isMounted = true
		this.changeHex = observe(selectedHex, (change) => {
			if (this._isMounted) {
				this.setState({ ...this.state, selectedHex: change.newValue })
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
				this.setState({ ...this.state, selectedKingdom: change.newValue })
		})
	}

	componentWillUnmount() {
		this._isMounted = false
		this.changeHex()
		this.changeKingdom()
		/*if(this.onDistrictChange)
			this.onDistrictChange()*/
	}

	addDistrict = () => {
		this.props.settlement.addDistrict()
		this.forceUpdate()
	}

	addSettlement = () => {
		this.props.selectedHex.createSettlement()
		this.forceUpdate()
	}
	removeDistrict = (id) => {
		if (this.props.selectedHex == null) return
		this.props.settlement.deleteDistrict(id)
	}

	selectDistrict = (district) => {
		this.props.onDistrictSelect(district)
		selectedDistrict.set(district)
	}

	getDistrictElementList = () => {
		return this.props.settlement.districts.map((value, index) => (
			<DistrictElement
				district={value}
				key={value.id}
				number={index}
				onSelect={this.selectDistrict}
				onDelete={this.removeDistrict}
			/>
		))
	}
	onSettlementNameChange = (event) => {
		this.props.settlement.setName(event.target.value)
	}

	render() {
		if (this.props.selectedKingdom == null) {
			return (
				<div className={"sidebarSettlement"}>
					<h3>No kingdom selected</h3>
				</div>
			)
		}
		if (this.props.selectedHex == null) {
			return (
				<div className={"sidebarSettlement"}>
					<h3>Select a hex first</h3>
				</div>
			)
		}
		if (this.props.settlement == null) {
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
				<input
					type={"text"}
					className={"sidebarSettlementNameInput"}
					value={this.props.settlement.name}
					onChange={this.onSettlementNameChange}
				/>
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

export default observer(SidebarSettlement)
export { selectedDistrict }
