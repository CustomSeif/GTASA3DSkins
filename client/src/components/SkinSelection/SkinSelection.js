import React, { Fragment, useEffect, useState } from "react"
import "./SkinSelection.css"
import axios from "axios"
import Loader from "../Loader/Loader"
import SkinSelectionSkin from "./SkinSelectionSkin/SkinSelectionSkin"

const SkinSelection = ({ history }) => {
    const [visible, setVisible] = useState(history.location.pathname === "/")
    const [skinSelection, setSkinSelection] = useState([])

    useEffect(() => {
        axios.get("/skins")
            .then(({ data }) => setSkinSelection(data))
    }, [])

    useEffect(() => {
        if (history.location.pathname !== "/" && visible) {
            const currentSelectedSkin = document.querySelector(`.SkinSelection__skin--${history.location.pathname.replace("/", "")}`)

            if (currentSelectedSkin) {
                const rectangle = currentSelectedSkin.getBoundingClientRect()

                const isAlreadyInView = Boolean(
                    rectangle.top >= 0 &&
                    rectangle.left >= 0 &&
                    rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rectangle.right <= (window.innerWidth || document.documentElement.clientWidth)
                )

                if (!isAlreadyInView) currentSelectedSkin.scrollIntoView()
            }
        }
    })

    return (
        <Fragment>
            {
                !visible ?
                (
                    <svg className="SkinSelection--button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setVisible(!visible)}>
                        <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ) :
                (
                    <svg className="SkinSelection--button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setVisible(!visible)}>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                )
            }

            <nav className={`SkinSelection ${visible}`}>
                {
                    !skinSelection.length ?
                    <Loader className="SkinSelection__loader" /> :
                    skinSelection.map((skin, index) => {
                        return (
                            <SkinSelectionSkin id={skin.id}
                                imageURL={skin.imageURL}
                                isCurrent={history.location.pathname.replace("/", "") === skin.model}
                                key={index}
                                model={skin.model}
                                modelURL={skin.modelURL}
                                name={skin.name}
                                visible={visible}
                                setVisible={setVisible}
                            />
                        )
                    })
                }
            </nav>
        </Fragment>
    )
}

export default SkinSelection