import React, { useState } from "react"
import "./SkinSelectionSkin.css"
import { Link } from "react-router-dom"

const SkinSelectionSkin = ({ id, imageURL, isCurrent, model, modelURL, name, visible, setVisible }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    if (modelURL === "No URL") return (
        <div className="SkinSelection__skin SkinSelection__skin--no-model">
            <img alt={name}
                className={`SkinSelection__skin__image ${imageLoaded}`}
                onLoad={() => setImageLoaded(true)}
                src={imageURL}
            />

            <span>{id}</span>
            <br />
            <span>{name}</span>
        </div>
    )

    return (
        <Link className={`SkinSelection__skin SkinSelection__skin--${model} ${isCurrent ? "SkinSelection__skin--current" : ""}`}
            onClick={() => setVisible(!visible)}
            to={`/${model}`}>
            <img alt={name}
                className={`SkinSelection__skin__image ${imageLoaded}`}
                onLoad={() => setImageLoaded(true)}
                src={imageURL}
            />

            <span>{id}</span>
            <br />
            <span>{name}</span>
        </Link>
    )
}

export default SkinSelectionSkin