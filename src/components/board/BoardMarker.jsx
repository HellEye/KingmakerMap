import React, { Component } from "react"
import markers from "../../scripts/kingdom/data/hexes/Markers"

class BoardMarker extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contextMenu: {
				open: false,
			},
		}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}
	markerContextMenu = (open) => (event) => {
		event.preventDefault()
		event.stopPropagation()
		this.setState({
			contextMenu: {
				open: open,
			},
		})
	}
	removeMarker = () => {
		markers.removeMarker(this.props.marker.id)
		this.setState({
			contextMenu: {
				open: false,
			},
		})
	}

	render() {
		const { marker } = this.props
		return (
			<div
				className={"boardMarker"}
				style={{
					left: marker.position.x,
					top: marker.position.y,
					transformOrigin: "top left",
				}}
				onContextMenu={this.markerContextMenu(true)}
			>
				<svg height="100" width="100">
					<circle
						cx={"50"}
						cy={"50"}
						r={"40"}
						stroke={"black"}
						strokeWidth={"3"}
						fill={marker.color}
					/>
				</svg>
				{this.state.contextMenu.open ? (
					<div
						className={"boardContextMenu"}
						style={{
							transform: `scale(${1 / this.props.scale})`,
							
							transformOrigin: "top left",
							// top:-20/this.props.scale,
							// left:50/this.props.scale
						}}
						onMouseLeave={this.markerContextMenu(false)}
					>
						<div className={"boardContextMenuItem"} onClick={this.removeMarker}>
							Remove
						</div>
					</div>
				) : (
					""
				)}
			</div>
		)
	}
}

export default BoardMarker
