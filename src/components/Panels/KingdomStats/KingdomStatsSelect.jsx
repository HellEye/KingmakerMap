import React, { Component } from "react"
import {
	kingdoms,
	selectedKingdom
} from "../../../scripts/kingdom/data/kingdoms"
import { observer } from "mobx-react"
import { observe } from "mobx"
import Select from "react-select"
import "../../../res/css/UI/Select.css"
import { setCookie } from "../../../scripts/utils/cookies"

class KingdomStats extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: this.props.value
		}
	}

	componentDidMount() {
		this._isMounted = true
		if (kingdoms.finishedLoading) {
			if(selectedKingdom?.get())
				this.selectKingdom({
					value: selectedKingdom?.get()?.id,
					label: selectedKingdom?.get()?.name
				})
		}
		this.kingdomChanged = observe(selectedKingdom, (change) => {
			if (
				this.state.selected == null ||
				change.newValue.id !== this.state.selected.value
			) {
				if (this._isMounted) {
					this.selectKingdom({
						value: change.newValue.id,
						label: change.newValue.name
					})
					this.forceUpdate()
				}
			}
		})
	}

	componentWillUnmount() {
		this._isMounted = false
		this.kingdomChanged()
	}

	getKingdomList = () => {
		if (!kingdoms.finishedLoading) return ""
		return kingdoms.kingdoms.map((k, ind) => {
			return { value: k.id, label: k.name }
		})
	}

	selectKingdom = (selected) => {
		const kingdom = kingdoms.getById(selected.value)
		if (!this._isMounted) return
		this.setState({
			selected: selected
		})
		setCookie("lastLoadedKingdom", selected.value, 365)
		selectedKingdom.set(kingdom)
	}

	styles = {
		option: (provided, state) => {
			return {
				...provided,
				backgroundColor: state.isSelected ? "#333c4a" : "#2a3340"
			}
		}
	}

	render() {
		const { selected } = this.state
		return (
			<div className={"selectKingdomWrap"} style={this.props.style}>
				<Select
					options={this.getKingdomList()}
					onChange={this.selectKingdom}
					value={selected != null ? selected : ""}
					styles={this.styles}
					className={"selectKingdom"}
					classNamePrefix={"selectKingdom"}
				/>
			</div>
		)
	}
}

export default observer(KingdomStats)
