import React, {Component} from 'react'
import '../../res/css/Board/Board.css'
import {getCookie, setCookie} from "../../scripts/utils/cookies"


class Board extends Component {
	state = {
		scale: 1.0,
		dimensions: {},
		position: {
			x: 0, y: 0
		}
	}
	scaleBounds = {
		min: 0.2,
		max: 1.5,
		step: 0.1 //0.1 is good
	}
	dragData = {
		dragStartPosition: {
			x: 0, y: 0
		},
		initialMapPosition: {
			x: 0, y: 0
		},
		dragging: false
	}

	getMousePosOnImage(image, x, y, scale) {
		let rect = image.getBoundingClientRect()
		return {
			left: (x - rect.left) / scale,
			top: (y - rect.top) / scale
		}
	}

	onMapDragStartHandler = event => {
		this.dragData = {
			dragStartPosition: {x: event.clientX, y: event.clientY},
			initialMapPosition: {x: this.state.position.x, y: this.state.position.y}
		}
		this.dragData.dragging = true
	}

	componentDidMount() {
        const prevPosition={x:getCookie("boardPosX"), y:getCookie("boardPosY"), scale:getCookie("boardScale")}
        if(prevPosition.scale!==""){
            this.setState({
                scale:parseFloat(prevPosition.scale)
            }, this.forceUpdate)
        }
        if(prevPosition.x!=="" && prevPosition.y!==""){
            this.setState({
                position:{
                    x:parseFloat(prevPosition.x), y:parseFloat(prevPosition.y)
                },

            }, this.forceUpdate)
        }
	}

    savePosToCookie(){
		try {
			setCookie("boardPosX", this.state.position.x, 365)
			setCookie("boardPosY", this.state.position.y, 365)
			setCookie("boardScale", this.state.scale, 365)
		}
		catch (error) {
	    }
    }

    onMapDragHandler = (event) => {
		if (!this.dragData.dragging) return
		let mousePos = {
			x: event.clientX,
			y: event.clientY
		}
		event.stopPropagation()
		event.preventDefault()

		this.setState(() => {
			return {
				position: {
					x: this.dragData.initialMapPosition.x - this.dragData.dragStartPosition.x + mousePos.x,
					y: this.dragData.initialMapPosition.y - this.dragData.dragStartPosition.y + mousePos.y
				}
			}
		})
	}

	onMapScrollHandler = (event) => {
		event.stopPropagation()
		event.preventDefault()
		let zoom = event.deltaY>0?1:-1
		let mousePos = this.getMousePosOnImage(event.currentTarget, event.clientX, event.clientY, this.state.scale)

		let newScale = this.state.scale - zoom * this.scaleBounds.step
		if (newScale < this.scaleBounds.min) newScale = this.scaleBounds.min
		else if (newScale > this.scaleBounds.max) newScale = this.scaleBounds.max

		// Milo's play time
		// if(newScale<this.scaleBounds.min || newScale>this.scaleBounds.max) this.scaleBounds.step=-this.scaleBounds.step

		let newMousePos = this.getMousePosOnImage(event.currentTarget, event.clientX, event.clientY, newScale)
		this.setState((prevState) => {
			return {
				scale: newScale,
				position: {
					x: prevState.position.x + (newMousePos.left - mousePos.left) * newScale,
					y: prevState.position.y + (newMousePos.top - mousePos.top) * newScale
				}
			}
		})
		this.savePosToCookie()
	}

	endDragging = () => {
		this.dragData.dragging = false;
		this.savePosToCookie()
	}

	getZoomFill = () =>{
		return (this.state.scale-this.scaleBounds.min)/(this.scaleBounds.max-this.scaleBounds.min)*100 + "%"
	}

	render() {
		return (
			<div className={"board"}
			     onMouseMove={this.onMapDragHandler}
			     onMouseDown={this.onMapDragStartHandler}
			     onMouseUp={this.endDragging}
			     onMouseLeave={this.endDragging}
			>
				<div className={"map"}
				     onWheel={this.onMapScrollHandler}
				     style={
					     {
						     // scale: this.state.scale,
						     left: this.state.position.x,
						     top: this.state.position.y,
						     transformOrigin: "top left",
						     transform: `scale(${this.state.scale})`
					     }
				     }>
					{this.props.children}
				</div>
				<div className={"boardZoomIndicator"}>
					<div className={"boardZoomIndicatorInner"} style={{width: this.getZoomFill()}}/>
				</div>
				<input type={"range"} min={0.2} max={1.5} step={0.05} value={this.state.scale}
				       readOnly={true}/>
			</div>
		)
	}
}

export default Board
