import React from "react"
import Board from "./board/Board"
import Sidebar from "./UI/Sidebar/Sidebar"
import Header from "./UI/Header/Header"
import HexGrid from "./board/HexGrid"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import SidebarElement from "./UI/Sidebar/SidebarElement"
import SettingsSidebarElement from "./UI/Sidebar/SettingsSidebarElement"
import Kingdoms from "./Panels/Kingdoms"

const image = require("../res/img/stolenLandsMap.jpg")
const tabs = [
	<SidebarElement key={0} href={"/Map"} onClick={() => console.log("clicked first")}>Map</SidebarElement>,
	<SidebarElement key={1} href={"/Stats"}>Stats</SidebarElement>,
	<SidebarElement key={2} href={"/Kingdoms"}>Kingdom overview</SidebarElement>,
	<SettingsSidebarElement key={999}>Toggle Grid</SettingsSidebarElement>
]

function App() {
	return (
		<div>
			<Header/>
			<div className={'page'}>
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

			</div>
		</div>

	)
}

export default App