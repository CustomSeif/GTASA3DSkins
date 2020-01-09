import React, { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import axios from "axios"
import ThreeDimensionSkin from "./components/ThreeDimensionSkin/ThreeDimensionSkin"
import SkinSelection from "./components/SkinSelection/SkinSelection"

const App = () => {
    const [skinSelection, setSkinSelection] = useState(null)

    useEffect(() => {
        axios.get("/skins")
            .then(({ data }) => setSkinSelection(data))
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <ThreeDimensionSkin />

                <SkinSelection skinSelection={skinSelection} />
            </div>
        </BrowserRouter>
    )
}

export default App
