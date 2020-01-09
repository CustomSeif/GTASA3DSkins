import React from "react"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import ThreeDimensionSkin from "./components/ThreeDimensionSkin/ThreeDimensionSkin"
import SkinSelection from "./components/SkinSelection/SkinSelection"

const App = () => {
    let history = createBrowserHistory()

    return (
        <Router history={history}>
            <div className="App">
                <ThreeDimensionSkin history={history} />

                <SkinSelection />
            </div>
        </Router>
    )
}

export default App
