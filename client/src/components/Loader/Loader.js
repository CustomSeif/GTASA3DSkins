import React from "react"
import "./Loader.css"

const Loader = ({ className, loaded }) => {
    if (loaded) return null

    return (
        <svg className={`Loader ${className}`} viewBox="0 0 50 50">
            <defs>
                <linearGradient id="loader-gradient">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.01)" />
                    <stop offset="100%" stopColor="white" />
                </linearGradient>
            </defs>

            <circle cx="25" cy="25" r="23" />
        </svg>
    )
}

export default Loader