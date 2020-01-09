import React, { useEffect, useRef, useState } from "react"
import "./ThreeDimensionSkin.css"
import * as THREE from "three"
import OrbitControls_ from "three-orbit-controls"
import GLTFLoader from "three-gltf-loader"
import axios from "axios"

const OrbitControls = OrbitControls_(THREE)

const ThreeDimensionSkin = ({ history }) => {
    const [model, setModel] = useState(null)
    const [name, setName] = useState(null)
    const [gender, setGender] = useState(null)
    const [modelURL, setModelURL] = useState(null)
    const [lightIntensity, setLightIntensity] = useState(null)

    const root = useRef()

    const renderer = new THREE.WebGLRenderer({ antialias: true })

    const getModelURL = async () => {
        const { data } = await axios.get(`/skin${history.location.pathname}`)

        if (!data.length) {
            setModel(null)
            setName(null)
            setGender(null)
            setModelURL(null)
            setLightIntensity(null)
        }

        else{
            setModel(data[0].model)
            setName(data[0].name)
            setGender(data[0].gender)
            setModelURL(data[0].modelURL)
            setLightIntensity(data[0].lightIntensity)
        }
    }

    useEffect(() => {
        if (history.location.pathname !== "/") getModelURL()

        renderer.setSize( window.innerWidth, window.innerHeight )
        renderer.setClearColor( 0xDDDDDD )
        root.current.appendChild( renderer.domElement )

        const scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
        let controls = new OrbitControls( camera, renderer.domElement )
        const light = new THREE.AmbientLight( 0xEEEEEE, 2 )

        controls.autoRotate = true
        camera.position.z = 1.5
        scene.add( light )

        new GLTFLoader().load(
            modelURL || "https://res.cloudinary.com/custom/raw/upload/v1541334600/Skins/Models/bb.glb",
            ( gltf ) => {
                scene.add( gltf.scene )
                gltf.scene.rotation.y = 3.2
            }
        )

        const animate = () => {
            requestAnimationFrame( animate )
            renderer.render( scene, camera )
            controls.update()
        }

        animate()
    })

    useEffect(() => () => root.current.removeChild( renderer.domElement ))

    history.listen(() => getModelURL())

    return (
        <div className="ThreeDimensionSkin" ref={root}>
            <div className="ThreeDimensionSkin__meta">
                <h1>
                    <span>{name}</span>
                </h1>

                <h2>
                    <span>{gender}</span>
                </h2>

                <h2>
                    <span>{`Model: ${model}`}</span>
                </h2>
            </div>
        </div>
    )
}

export default ThreeDimensionSkin