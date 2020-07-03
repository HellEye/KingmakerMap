import React, {useDebugValue} from "react"
import Board from "./board/Board.jsx"
import Sidebar from "./UI/Sidebar/Sidebar.jsx"
import Header from "./UI/Header/Header.jsx"
import HexGrid from "./board/HexGrid.jsx"
import Kingdoms from "./Panels/Kingdoms.jsx"
import CookiePopup from "./util/CookiePopup"
import KingdomSheet from "./Panels/KingdomStats/KingdomSheet/KingdomSheet"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs"
import {observer} from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import "../res/css/Panels/KingdomStats.css"
import {getCookie, setCookie} from "../scripts/utils/cookies"
import BuildingGrid from "./Panels/District/BuildingGrid"

const image = require("../res/img/stolenLandsMap.jpg")

function App() {
	const lastTabCookie = getCookie("lastTabNumber")
	const [state, setState]=React.useState({
		selectedTab:lastTabCookie!==""?
			parseInt(lastTabCookie):0,
		selectedDistrict:null,
	})
	const onTabSwitch = (tab) => {
		setCookie("lastTabNumber", tab, 365)
		setState({...state, selectedTab:tab})
	}

	//Very dirty reference passing through multiple layers
	// but it works
	const onDistrictSelect=(district)=>{
		setState({...state, selectedTab:4, selectedDistrict: district})
	}
	const onDistrictRemoved =(districtId)=> {
		if (state.selectedTab === 4 && districtId === state.selectedDistrict.id) {
			setState({...state, selectedTab: 0})
		}
	}
	useDebugValue(state.selectedDistrict)

	return (
		<Tabs
			forceRenderTabPanel={false}
			onSelect={onTabSwitch}
			selectedIndex={state.selectedTab}
			className={'screen react-tabs'}>
			<Header>
				<TabList className={"headerNav"} style={{gridArea: "nav"}}>
					<Tab className={"buttonGrey"}>
						Map
					</Tab>
					<Tab className={"buttonGrey"}>
						Kingdom sheet
					</Tab>
					<Tab className={"buttonGrey"}>
						Kingdom list
					</Tab>
					<Tab className={"buttonGrey"}>
						Settings
					</Tab>
					{/*Necessary for Tabs to work apparently,
						can't just have 5 tabs and 4 tab buttons*/}
					<Tab className={"hiddenTab"}
					/>
				</TabList>
			</Header>
			<Sidebar
				onDistrictSelect={onDistrictSelect}
				onDistrictRemoved={onDistrictRemoved}

			/>
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
				<KingdomSheet/>
			</TabPanel>

			<TabPanel>
				<Kingdoms/>
			</TabPanel>

			<TabPanel>
				<h1>Settings</h1>
			</TabPanel>
			<TabPanel>
				<BuildingGrid
					selectedDistrict={state.selectedDistrict}
				/>
			</TabPanel>

			<CookiePopup/>

		</Tabs>


	)
}

export default observer(App)
