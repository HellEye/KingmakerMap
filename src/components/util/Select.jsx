import React, {cloneElement, Component, isValidElement} from "react"
class SelectGroup extends Component{
	constructor(props){
		super(props)
		this.state={
			selected:[]
		}
	}

	onChangeCallback = (number) => (e)=>{
		this.props.onChange(number)
	}
	render(){
		const groupedChildren = Children.map(children, (child)=>{
			if(isValidElement(child))
				return cloneElement(child, {onChange: this.onChangeCallback})
			return child
		})
		return (
			<div>
				{groupedChildren}
			</div>
		)
	}
}
class Select extends Component{
	render(){
		return (
			<input
				type={"button"}
				className={"select "+this.props.multiple?"selectCheckbox ":"selectRadio"+this.props.className}
				onClick={this.props.onClick}
			/>
		)
	}
}
export {Select, SelectGroup}