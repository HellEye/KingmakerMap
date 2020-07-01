import React, {Component} from "react"
import {observer} from "mobx-react"
import {hexDataGrid} from "../../../../scripts/kingdom/data/hexData"
import "../../../../res/css/UI/numberInput.css"
import NumberInput from "../../../util/NumberInput"

class KingdomSheetField extends Component {
	render() {
		return (
			<div className={"kingdomSheetField"}>
				<h3>{this.props.name}:</h3>
				<h4>{hexDataGrid.getModifiersByKingdomId(this.props.kingdom.id)[this.props.value]}</h4>
				<h4>{this.props.kingdom.kingdomData.getters[this.props.value]()}</h4>
				<NumberInput
					name={this.props.value}
					value={this.props.kingdom.kingdomData.data[this.props.value]}
					kingdom={this.props.kingdom}
					changeCallback={this.props.changeCallback}
					saveCallback={this.props.saveCallback}
				/>

			</div>
		)
	}
}

export default observer(KingdomSheetField)