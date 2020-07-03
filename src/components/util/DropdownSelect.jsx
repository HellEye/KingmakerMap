import React, {Component} from "react"
import Select from "react-select"
import "../../res/css/UI/DropdownSelect.css"
class DropdownSelect extends Component {

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	onChange = (change)=>{
		this.props.onChange(change)
	}

	render() {
		return (
			<div className={"selectKingdomWrap"} style={this.props.style}>
				<Select
					options={this.props.options}
					onChange={this.onChange}
					value={this.props.value}
					isDisabled={this.props.disabled}
					className={"dropdownSelect"}
					classNamePrefix={"dropdownSelect"}
					/>
			</div>
		)
	}
}

export default DropdownSelect