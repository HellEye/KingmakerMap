import React from "react"
import Board from "./board/Board.jsx"
import Sidebar from "./UI/Sidebar/Sidebar.jsx"
import Header from "./UI/Header/Header.jsx"
import HexGrid from "./board/HexGrid.jsx"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import SidebarElement from "./UI/Sidebar/SidebarElement.jsx"
import SettingsSidebarElement from "./UI/Sidebar/SettingsSidebarElement.jsx"
import Kingdoms from "./Panels/Kingdoms.jsx"
import CookiePopup from "./util/CookiePopup"

const image = require("../res/img/stolenLandsMap.jpg")
const tabs = [
	<SidebarElement key={0} href={"/Map"} onClick={() => console.log("clicked first")}>Map</SidebarElement>,
	<SidebarElement key={1} href={"/Stats"}>Stats</SidebarElement>,
	<SidebarElement key={2} href={"/Kingdoms"}>Kingdom overview</SidebarElement>,
	<SettingsSidebarElement key={999}>Toggle Grid</SettingsSidebarElement>
]

function App() {

	return (
		<div className={'screen'}>
			<Header/>
			<BrowserRouter>
				<Sidebar>
					<h3>Sidebar</h3>
					{tabs}
				</Sidebar>
				<Switch>
					<Route path={"/Map"}>
						<Board>
							<img
								alt={"Map"}
								draggable={"false"}
								src={image}
							/>
							<HexGrid/>
						</Board>
					</Route>
					<Route path={"/Stats"}>
						<div> Stats</div>
					</Route>
					<Route path={"/Kingdoms"}>
						<Kingdoms/>
					</Route>
				</Switch>
			</BrowserRouter>
			<CookiePopup/>

		</div>

	)
}

export default App