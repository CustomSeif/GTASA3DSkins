import React, { useEffect, useState } from "react"
import "./SkinSelection.css"
import axios from "axios"
import Loader from "../Loader/Loader"
import SkinSelectionSkin from "./SkinSelectionSkin/SkinSelectionSkin"

const SkinSelection = () => {
    const [skinSelection, setSkinSelection] = useState(null)

    useEffect(() => {
        axios.get("/skins")
            .then(({ data }) => setSkinSelection(data))
    }, [])

    return (
        <nav className="SkinSelection">
            {
                skinSelection === null ?
                <Loader className="SkinSelection__loader" /> :
                skinSelection.map((skin, index) => {
                    return (
                        <SkinSelectionSkin imageURL={skin.imageURL}
                            key={index}
                            model={skin.model}
                            modelURL={skin.modelURL}
                            name={skin.name}
                        />
                    )
                })
            }
        </nav>
    )
}

export default SkinSelection