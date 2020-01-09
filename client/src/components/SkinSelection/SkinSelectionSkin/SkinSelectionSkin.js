import React, { useState } from "react"
import "./SkinSelectionSkin.css"
import { Link } from "react-router-dom"

const SkinSelectionSkin = ({ imageURL, model, name }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Link className="SkinSelection__skin" to={`/${model}`}>
            <img alt={name}
                className={`SkinSelection__skin__image ${imageLoaded}`}
                onLoad={() => setImageLoaded(true)}
                src={imageURL}
            />

            <span>{name}</span>
        </Link>
    )
}

export default SkinSelectionSkin