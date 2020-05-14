import React from "react"
import Map from "./board/Map"
import Sidebar from "./UI/Sidebar/Sidebar";
import Header from "./UI/Header/Header";
function App() {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <Map/>
        </div>

    )
}

export default App