import React from "react"
import "./SkinSelection.css"
import Loader from "../Loader/Loader"
import SkinSelectionSkin from "./SkinSelectionSkin/SkinSelectionSkin"

const SkinSelection = ({ skinSelection }) => {
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
                            name={skin.name}
                        />
                    )
                })
            }
        </nav>
    )
}

export default SkinSelection