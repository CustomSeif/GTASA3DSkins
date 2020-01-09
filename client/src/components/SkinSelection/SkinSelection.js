import React from "react"
import "./SkinSelection.css"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"

const SkinSelection = ({ skinSelection }) => {
    return (
        <nav className="SkinSelection">
            {
                skinSelection === null ?
                <Loader className="SkinSelection__loader" /> :
                skinSelection.map((skin, index) => {
                    return (
                        <Link to="/" key={index}>
                            {skin.name}
                        </Link>
                    )
                })
            }
        </nav>
    )
}

export default SkinSelection