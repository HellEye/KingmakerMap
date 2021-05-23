import React, {Component} from "react"
import markers from "../../scripts/kingdom/data/hexes/Markers"

class BoardContextMenu extends Component {
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

	createMarker=(color)=>(event)=>{
		markers.addMarker(this.props.data.x, this.props.data.y, color)
		this.props.onOptionSelected()
	}

	render() {
		return (
			<div className={"boardContextMenu"}
				style={{
					left:this.props.data.x,
					top:this.props.data.y,
					transformOrigin:"top left",
					transform: `scale(${1/this.props.scale})`
				}}
			     onClick={e=>e.stopPropagation()}
			     onMouseOver={e=>e.stopPropagation()}
			     onMouseLeave={(e)=>{this.props.onMouseLeave(e)}}
			>
				<div className={"boardContextMenuItem"}
					onClick={this.createMarker("red")}
				>
					Add Marker
				</div>
			</div>
		)
	}
}

export default BoardContextMenu