import React from "react"
import Board from "./board/Board"
import Sidebar from "./UI/Sidebar/Sidebar";
import Header from "./UI/Header/Header";
function App() {
    return (
        <div>
            <Header/>
            <div className={'page'}>
                <Sidebar/>
                <Board/>
            </div>
        </div>

    )
}

export default App