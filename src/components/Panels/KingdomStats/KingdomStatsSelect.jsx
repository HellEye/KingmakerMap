import React, {Component} from "react"
import {kingdoms} from "../../../scripts/kingdom/data/kingdoms"
import {observer} from "mobx-react"
import {observe} from "mobx"
import Select from "react-select"
import "../../../res/css/UI/Select.css"
import {bool} from "prop-types"
import {getCookie, setCookie} from "../../../scripts/utils/cookies"

class KingdomStats extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: null
		}
	}

	componentDidMount() {
		const kingdomsLoaded = observe(kingdoms, "finishedLoading", change => {
			if (change.newValue) {
				const loadedName = getCookie("lastLoadedKingdom")
				if(loadedName!=="")
					this.selectKingdom({value:loadedName, label:loadedName})
				this.forceUpdate()
				kingdomsLoaded()
			}
		})
	}


	getKingdomList = () => {
		if (!kingdoms.finishedLoading)
			return ""
		return kingdoms.kingdoms.map(
			(k, ind) => {
				return {value: k.name, label: k.name}
			})

	}

	selectKingdom = (selected) => {
		const kingdom = kingdoms.getByName(selected.value)
		this.setState({
			selected:selected
		})
		setCookie("lastLoadedKingdom", selected.value, 365)
		this.props.callback(kingdom)

	}


	styles = {
		option: (provided, state) => {
			return {
				...provided,
				backgroundColor: state.isSelected?"#333c4a":"#2a3340",
			}
		},
	}


	render() {
		const {selected} = this.state
		return (
				<div className={"selectKingdomWrap"}>
					<Select options={this.getKingdomList()}
					        onChange={this.selectKingdom}
					        value={selected!=null ? selected : ""}
					        styles={this.styles}
					        className={"selectKingdom"}
					        classNamePrefix={"selectKingdom"}
					/>
				</div>
		)
	}
}

export default observer(KingdomStats)