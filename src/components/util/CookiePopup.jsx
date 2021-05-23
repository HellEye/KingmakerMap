import React, {Component} from "react"
import {getCookie, setCookie} from "../../scripts/utils/cookies"
import "../../res/css/UI/CookiePopup.css"
import "../../res/css/UI/Button.css"

import img from "../../res/img/cookieImg.png"

class CookiePopup extends Component {

	constructor(props) {
		super(props)
		const cookie = getCookie("cookiesAccepted")
		this.state = {
			cookiesAccepted: cookie!==""
		}
	}

	approveCookie = () => {
		setCookie("cookiesAccepted", "1", 365)
		this.setState({cookiesAccepted: true})
	}

	render() {
		return !this.state.cookiesAccepted ?
			<div className={"cookiePopup"}>
				<img src={img} alt={"Cookie"} title={"by Feeby Neko"}/>
				<div>
					<h3>I'm using cookies for various</h3>
					<h3> miscellaneous reasons. </h3>
					<h3>Just a heads up :3</h3>
				</div>
				<input type={"button"} className={"button"} onClick={this.approveCookie} value={"Gotcha"}/>
			</div>
			: ""

	}
}

export default CookiePopup