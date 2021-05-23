import React, {Component} from "react"
import {edicts} from "../../../../scripts/kingdom/data/kingdomData"
import {observer} from "mobx-react"
import Select from "react-select"

class KingdomSheetEdict extends Component {
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
	onChange = (newValue)=>{
		console.log(this.props.kingdom.kingdomData.data[this.props.value])
		this.props.changeCallback({name:this.props.value,value:newValue.value})
		this.props.saveCallback()
	}

	render() {
		const selectedEdict=edicts[this.props.value]
		const currentValue=this.props.kingdom.kingdomData.data[this.props.value]
		return (
			<div className={"kingdomSheetEdict"}>
				<h3>{this.props.name}</h3>
				<Select
					onChange={this.onChange}
					className={"dropdownSelect"}
					classNamePrefix={"dropdownSelect"}
					value={{label:selectedEdict[currentValue].name,value:currentValue}}
					options={selectedEdict.map((v, i) => {
						return {value: i, label: v.name}
					})}
				/>
				<h4 className={"numberField"}>{selectedEdict[currentValue].loyalty}</h4>
				<h4 className={"numberField"}>{selectedEdict[currentValue].stability}</h4>
				<h4 className={"numberField"}>{selectedEdict[currentValue].economy}</h4>
				<h4 className={"otherEffect"}>{selectedEdict[currentValue].other}</h4>

			</div>
		)
	}
}

export default observer(KingdomSheetEdict)