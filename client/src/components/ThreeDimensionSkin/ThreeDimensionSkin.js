import React, { Component } from "react"
import "./ThreeDimensionSkin.css"
import axios from "axios"
import * as THREE from "three"
import OrbitControls_ from "three-orbit-controls"
import GLTFLoader from "three-gltf-loader"

const OrbitControls = OrbitControls_(THREE)

const defaultSkin = {
    model: "bb",
    name: "Barry 'Big Bear' Thorne [Big]",
    gender: "Male",
    modelURL: "https://res.cloudinary.com/custom/raw/upload/v1541334600/Skins/Models/bb.glb",
    lightingIntensity: 2
}

class ThreeDimensionSkin extends Component {
    state = defaultSkin

    handleGetSkin = () => new Promise(resolve => {
        axios.get(`/skin${this.props.history.location.pathname}`)
            .then(({ data }) => {
                if (data.length) this.setState({ ...data[0] }, () => resolve())
                else this.setState(defaultSkin, () => resolve())
            })
    })

    handleRender = () => {
        if (this.root.lastChild.tagName === "CANVAS") this.root.lastChild.remove()

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setClearColor( 0xDDDDDD )
        this.root.appendChild( this.renderer.domElement )

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        this.light = new THREE.AmbientLight( 0xEEEEEE, this.state.lightingIntensity )

        this.controls.autoRotate = true
        this.camera.position.z = 1.5
        this.scene.add( this.light )

        this.GLTFLoader = new GLTFLoader()

        this.GLTFLoader.load(
            this.state.modelURL,
            ( gltf ) => {
                this.scene.add( gltf.scene )
                gltf.scene.rotation.y = 3.2
            }
        )

        this.animate = () => {
            requestAnimationFrame( this.animate )
            this.renderer.render( this.scene, this.camera )
            this.controls.update()
        }

        this.animate()
    }

    async componentDidMount() {
        if (this.props.history.location.pathname !== "/") this.handleGetSkin().then(this.handleRender)
        else this.handleRender()

        this.props.history.listen(() => {
            this.handleGetSkin().then(this.handleRender)
        })
    }

    componentWillUnmount() {
        this.root.removeChild( this.renderer.domElement )
    }

    render() {
        return (
            <div className="ThreeDimensionSkin" ref={(element) => this.root = element}>
                <div className="ThreeDimensionSkin__meta">
                    <h1>
                        <span>{this.state.name}</span>
                    </h1>

                    <h2>
                        <span>{this.state.gender}</span>
                    </h2>

                    <h2>
                        <span>{`Model: ${this.state.model}`}</span>
                    </h2>

                    <h2>
                        <span>By: Mohamed Seif Khalid</span>
                    </h2>
                </div>
            </div>
        )
    }
}

export default ThreeDimensionSkin