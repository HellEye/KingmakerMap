import React, {Component} from 'react';
import '../../res/css/Board/Board.css';
import HexGrid from "./HexGrid";

class Board extends Component {
    state = {
        scale: 1.0,
        image: require("../../res/img/stolenLandsMap.jpg"),
        dimensions: {},
        position: {
            x: 0, y: 0
        },
    };
    scaleBounds = {
        min: 0.2,
        max: 1.5,
        step: 0.01
    };
    dragData = {
        dragStartPosition: {
            x: 0, y: 0
        },
        initialMapPosition: {
            x: 0, y: 0
        },
        dragging: false
    };
    scalePos = {
        x: 0, y: 0
    };


    constructor(props) {
        super(props);
        const img = new Image();
        img.src = this.state.image;
    }

    getMousePosOnImage(image, x, y, scale) {
        let rect = image.getBoundingClientRect();
        return {
            left: (x - rect.left) / scale,
            top: (y - rect.top) / scale
        }
    }

    onMapDragStartHandler = event => {
        this.dragData = {
            dragStartPosition: {x: event.clientX, y: event.clientY},
            initialMapPosition: {x: this.state.position.x, y: this.state.position.y}
        };
        this.dragData.dragging = true;
    };

    onMapDragHandler = (event) => {
        if (!this.dragData.dragging) return;
        let mousePos = {
            x: event.clientX,
            y: event.clientY
        };
        event.stopPropagation();
        event.preventDefault();

        this.setState(() => {
            return {
                position: {
                    x: this.dragData.initialMapPosition.x - this.dragData.dragStartPosition.x + mousePos.x,
                    y: this.dragData.initialMapPosition.y - this.dragData.dragStartPosition.y + mousePos.y
                }
            }
        });

    };

    onMapScrollHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let zoom = event.deltaY;
        let mousePos = this.getMousePosOnImage(event.currentTarget, event.clientX, event.clientY, this.state.scale);

        let newScale = this.state.scale + zoom * this.scaleBounds.step;
        if (newScale < this.scaleBounds.min) newScale = this.scaleBounds.min;
        else if (newScale > this.scaleBounds.max) newScale = this.scaleBounds.max;

        let newMousePos = this.getMousePosOnImage(event.currentTarget, event.clientX, event.clientY, newScale);
        this.setState((prevState) => {
            return {
                scale: newScale,
                position: {
                    x: prevState.position.x + (newMousePos.left - mousePos.left) * newScale,
                    y: prevState.position.y + (newMousePos.top - mousePos.top) * newScale
                }
            }
        });
    };

    render() {

        return (
            <div className={"board"}
                 onMouseMove={this.onMapDragHandler}
                 onMouseDown={this.onMapDragStartHandler}
                 onMouseUp={() => this.dragData.dragging = false}
                 onMouseLeave={() => this.dragData.dragging = false}
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
                    <img
                        alt={"Map"}
                        draggable={"false"}
                        src={this.state.image}
                    />
                    <HexGrid dragData={this.dragData}/>

                </div>
                <input type={"range"} min={0.2} max={1.5} step={0.05} value={this.state.scale}
                       readOnly={true}/>
            </div>
        )
    }
}

export default Board;
