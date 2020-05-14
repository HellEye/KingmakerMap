import React, {Component} from 'react';
import '../../res/css/Board/Board.css';


class Map extends Component {
    state = {
        scale: 1.0,
        image: require("../../res/img/stolenLandsMap.jpg"),
        dimensions: {}
    };

    constructor(props) {
        super(props);
        const img = new Image();
        img.addEventListener("load", () => {
            console.log(this.naturalHeight);
        });
        img.src = this.state.image;
    }

    onSliderChange = (event) => {
        console.log(this.state.dimensions.height);
        this.setState({
            scale: event.target.value
        })
    };

    render() {
        return (
            <div className={"board"}>
                <div className={"map"} style={{scale: this.state.scale}}>
                    <img
                        alt={"Map"}
                        src={this.state.image}
                    />
                </div>
                <input type={"range"} min={0.2} max={1.5} step={0.05} value={this.state.scale}
                       onChange={this.onSliderChange}/>
            </div>
        )
    }
}

export default Map;
