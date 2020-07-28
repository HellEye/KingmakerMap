import React, {Component} from "react"
import Checkbox from "@material-ui/core/Checkbox"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import NumberInput from "../../../util/NumberInput"
import {observer} from "mobx-react"

class KingdomSheetRuler extends Component {

	constructor(props) {
		super(props);
		this.state = this.props.extraMultiple ? {
				...this.props.selected
			}
			: {
				selected: (Object.entries(this.props.selected).length > 0) ? (Object.entries(this.props.selected).find(value => value[1])[0]) : ""
			}
	}

	onCheckboxChange = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.checked
		})
		this.props.kingdom.kingdomData.data.positions[this.props.extra][event.target.name] = event.target.checked
		this.props.saveCallback()
	}
	onRadioChange = (event) => {
		this.setState({
			...this.state,
			selected: event.target.name
		})
		this.props.kingdom.kingdomData.data.positions[this.props.extra].stability = false
		this.props.kingdom.kingdomData.data.positions[this.props.extra].loyalty = false
		this.props.kingdom.kingdomData.data.positions[this.props.extra].economy = false
		this.props.kingdom.kingdomData.data.positions[this.props.extra][event.target.name] = event.target.checked
		this.props.saveCallback()
	}

	render() {
		return (
			<div className={"kingdomSheetField"}>
				<h3>{this.props.name}:</h3>
				<NumberInput
					key={this.props.kingdom.kingdomData.data.positions[this.props.value]}
					name={this.props.value}
					value={this.props.kingdom.kingdomData.data.positions[this.props.value]}
					changeCallback={this.props.changeCallback}
					saveCallback={this.props.saveCallback}
					kingdom={this.props.kingdom}/>
				{(this.props.extra != null) ?
					(this.props.extraMultiple) ?
						(<div className={"kingdomSheetRulerCheck"}>
							<FormControlLabel
								label={"Stability"}
								labelPlacement={"bottom"}
								control={
									<Checkbox
										name={"stability"}
										checked={this.state.stability}
										onChange={this.onCheckboxChange}
									/>}/>
							<FormControlLabel
								label={"Loyalty"}
								labelPlacement={"bottom"}
								control={
									<Checkbox
										name={"loyalty"}
										checked={this.state.loyalty}
										onChange={this.onCheckboxChange}
										label={"Loyalty"}
									/>}/>
							<FormControlLabel
								label={"Economy"}
								labelPlacement={"bottom"}
								control={
									<Checkbox
										name={"economy"}
										checked={this.state.economy}
										onChange={this.onCheckboxChange}
										label={"Economy"}
									/>}/>
						</div>)
						:
						(<div className={"kingdomSheetRulerCheck"}>
							<FormControlLabel
								label={"Stability"}
								labelPlacement={"bottom"}
								control={
									<Radio
										name={"stability"}
										checked={this.state.selected === 'stability'}
										onChange={this.onRadioChange}
										label={"Stability"}
									/>}/>
							<FormControlLabel
								label={"Loyalty"}
								labelPlacement={"bottom"}
								control={
									<Radio
										name={"loyalty"}
										checked={this.state.selected === 'loyalty'}
										onChange={this.onRadioChange}
										label={"Loyalty"}
									/>}/>
							<FormControlLabel
								label={"Economy"}
								labelPlacement={"bottom"}
								control={
									<Radio
										name={"economy"}
										checked={this.state.selected === 'economy'}
										onChange={this.onRadioChange}
										label={"Economy"}
									/>}/>
						</div>)
					:
					<div className={"kingdomSheetRulerCheck"}>
						<h4>{this.props.attribute?this.props.attribute:""}</h4>
					</div>}
			</div>
		)
	}
}

export default observer(KingdomSheetRuler)