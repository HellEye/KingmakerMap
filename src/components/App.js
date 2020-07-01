import React from "react"
import Board from "./board/Board.jsx"
import Sidebar from "./UI/Sidebar/Sidebar.jsx"
import Header from "./UI/Header/Header.jsx"
import HexGrid from "./board/HexGrid.jsx"
import {Route} from "react-router-dom"
import Kingdoms from "./Panels/Kingdoms.jsx"
import CookiePopup from "./util/CookiePopup"
import KingdomSheet from "./Panels/KingdomStats/KingdomSheet/KingdomSheet"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs"
import {observable, observe} from "mobx"
import {observer} from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import "../res/css/Panels/KingdomStats.css"
import {getCookie, setCookie} from "../scripts/utils/cookies"
const image = require("../res/img/stolenLandsMap.jpg")

// const selectedTab=observable.box(0)
function App() {
	// const [selected, setSelected]=React.useState(0)
	// const switchTab = observe(selectedTab, (change)=>{
	// 	console.log(change.newValue)
	// 	setSelected(change.newValue)
	// })
	const lastTabCookie = getCookie("lastTabNumber")
	let lastTab=0
	if(lastTabCookie!=="")
		lastTab=parseInt(lastTabCookie)
	const onTabSwitch=(tab)=>{
		setCookie("lastTabNumber", tab, 365)
	}
	return (
		<Tabs defaultIndex={lastTab} forceRenderTabPanel={false} onSelect={onTabSwitch} className={'screen react-tabs'}>

		{/*<div className={'screen'}>*/}
				<Header>
					<TabList className={"headerNav"} style={{gridArea:"nav"}}>
						<Tab className={"buttonGrey"}>
							Map
						</Tab>
						<Tab className={"buttonGrey"}>
							Kingdom sheet
						</Tab>
						<Tab  className={"buttonGrey"}>
							Kingdom list
						</Tab>
						<Tab  className={"buttonGrey"}>
							Settings
						</Tab>
					</TabList>
				</Header>
				<Sidebar/>
				<TabPanel forceRender={true}>
					<Board>
						<img
							alt={"Map"}
							draggable={"false"}
							src={image}
						/>
						<HexGrid/>
					</Board>
				</TabPanel>
				<TabPanel>
					<Kingdoms/>
				</TabPanel>
				<TabPanel>
					<KingdomSheet/>
				</TabPanel>
				<TabPanel>
					<h1>Settings</h1>
				</TabPanel>

			<CookiePopup/>

		{/*</div>*/}
		</Tabs>


	)
}

export default observer(App)
// export {selectedTab}