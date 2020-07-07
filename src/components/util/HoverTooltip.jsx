import React, {Component} from "react"
import MouseTooltip from "react-sticky-mouse-tooltip"

class HoverTooltip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mouseHover: false,
			mousePosX: 0,
			mousePosY: 0,
		}
	}

	onMouseEnter = (event) => {
		this.setState({
			...this.state,
			mouseHover: true,
			mousePosX: event.clientX,
			mousePosY: event.clientY,
		})
	}
	onMouseLeave = (event) => {
		this.setState({
			...this.state,
			mouseHover: false,
		})
	}

	componentDidMount = () => {
		this._isMounted = true
		this.props.hoverObject.current.addEventListener("mouseenter", this.onMouseEnter)
		this.props.hoverObject.current.addEventListener("mouseleave", this.onMouseLeave)

	}
	componentWillUnmount = () => {
		this._isMounted = false
		if (this.props.hoverObject.current) {
			this.props.hoverObject.current.removeEventListener("mouseenter", this.onMouseEnter)
			this.props.hoverObject.current.removeEventListener("mouseleave", this.onMouseLeave)
		}
	}

	render() {
		if(!this.state.mouseHover) return ""
		return (
			<MouseTooltip
				visible={this.state.mouseHover}
				offsetX={this.state.mousePosX + this.props.width + 5 > window.innerWidth ? -this.props.width - 10 : 20}
				offsetY={this.state.mousePosY + this.props.height + 5 > window.innerHeight ? -this.props.height - 10 : 20}
				style={{
					zIndex: 15,
				}}
			>
				<div className={"mouseTooltip " + this.props.className ? this.props.className : ""}>
					{this.props.children}
				</div>
			</MouseTooltip>
		)
	}
}

export default HoverTooltip