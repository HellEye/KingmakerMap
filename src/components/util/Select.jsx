import React, {cloneElement, Component, isValidElement} from "react"
class SelectGroup extends Component{
	constructor(props){
		super(props)
		this.state={
			selected:[]
		}
	}

	onChangeCallback = ()=>{

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
			<input type={this.props.multiple?"Checkbox":"Radio"} onChange={this.props.onChange}/>
		)
	}
}
export {Select, SelectGroup}