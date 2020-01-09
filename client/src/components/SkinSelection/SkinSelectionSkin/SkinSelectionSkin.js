import React, { useState } from "react"
import "./SkinSelectionSkin.css"
import { Link } from "react-router-dom"

const SkinSelectionSkin = ({ imageURL, model, modelURL, name, visible, setVisible }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    if (modelURL === "No URL") return (
        <div className="SkinSelection__skin SkinSelection__skin--no-model">
            <img alt={name}
                className={`SkinSelection__skin__image ${imageLoaded}`}
                onLoad={() => setImageLoaded(true)}
                src={imageURL}
            />

            <span>{name}</span>
        </div>
    )

    return (
        <Link className="SkinSelection__skin" to={`/${model}`} onClick={() => setVisible(!visible)}>
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