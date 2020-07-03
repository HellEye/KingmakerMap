import React, {Component} from "react"
import {observer} from "mobx-react"
import "../../../../res/css/UI/numberInput.css"
import NumberInput from "../../../util/NumberInput"

class KingdomSheetField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hexDataLoaded: false
		}
	}


	/*componentDidMount() {
		this._isMounted = true
		when(()=>hexDataGrid.loaded, () => {
			if (this._isMounted) {
				this.setState({hexDataLoaded: true})
			}
		})
	}

	componentWillUnmount() {
		this._isMounted = false
	}*/

	render() {
		/*if (!this.state.hexDataLoaded)
			return (
				<div className={"kingdomSheetField"}>Loading</div>
			)*/
		return (
			<div className={"kingdomSheetField"}>
				<h3>{this.props.name}:</h3>
				<h4>{this.props.settlementBonuses[this.props.value]}</h4>
				<h4>{this.props.kingdom.kingdomData.getters[this.props.value]()}</h4>
				<NumberInput
					name={this.props.value}
					value={this.props.kingdom.kingdomData.data[this.props.value]}
					changeCallback={this.props.changeCallback}
					saveCallback={this.props.saveCallback}
				/>

			</div>
		)
	}
}

export default observer(KingdomSheetField)