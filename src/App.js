import React from "react"
import { BrowserRouter } from "react-router-dom"
import ThreeDimensionSkin from "./components/ThreeDimensionSkin/ThreeDimensionSkin"

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <ThreeDimensionSkin />
            </div>
        </BrowserRouter>
    )
}

export default App
