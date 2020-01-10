import React, { Component } from "react"
import "./ThreeDimensionSkin.css"
import axios from "axios"
import * as THREE from "three"
import OrbitControls_ from "three-orbit-controls"
import GLTFLoader from "three-gltf-loader"
import { Helmet } from "react-helmet"

const OrbitControls = OrbitControls_(THREE)

const defaultSkin = {
    id: 5,
    model: "bb",
    name: "Barry 'Big Bear' Thorne [Big]",
    gender: "Male",
    modelURL: "https://res.cloudinary.com/custom/raw/upload/v1541334600/Skins/Models/bb.glb",
    lightingIntensity: 2
}

class ThreeDimensionSkin extends Component {
    state = {
        ...defaultSkin,
        width: window.innerWidth,
        height: window.innerHeight
    }

    handleGetSkin = () => new Promise(resolve => {
        axios.get(`/skin${this.props.history.location.pathname}`)
            .then(({ data }) => {
                if (data.length) this.setState({ ...data[0] }, () => resolve())
                else this.setState({ ...defaultSkin }, () => resolve())
            })
    })

    handleRender = () => {
        if (this.root.lastChild.tagName === "CANVAS") this.root.lastChild.remove()

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.state.width, this.state.height)
        this.renderer.setClearColor(0xDDDDDD)
        this.root.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.light = new THREE.AmbientLight(0xEEEEEE, this.state.lightingIntensity)

        this.controls.autoRotate = true
        this.controls.autoRotateSpeed = 2
        this.camera.position.z = 1.5
        this.scene.add(this.light)

        this.GLTFLoader = new GLTFLoader()

        this.GLTFLoader.load(
            this.state.modelURL,
            (gltf) => {
                this.scene.add(gltf.scene)
                gltf.scene.rotation.y = 3.2
            }
        )

        this.animate = () => {
            requestAnimationFrame(this.animate)
            this.renderer.render(this.scene, this.camera)
            this.controls.update()
        }

        this.animate()
    }

    handleGetSkinById = id => new Promise(resolve => {
        axios.get(`/skin-id/${id}`)
            .then(({ data }) => {
                if (data.length) this.setState({ ...data[0] }, () => resolve())
                else this.setState({ ...defaultSkin }, () => resolve())
            })
    })

    handlePrevious = () => {
        if (this.state.id - 1 < 1) return
        this.handleGetSkinById(this.state.id - 1).then(() => this.props.history.push(`/${this.state.model}`))
    }

    handleNext = () => {
        if (this.state.id + 1 >299) return
        this.handleGetSkinById(this.state.id + 1).then(() => this.props.history.push(`/${this.state.model}`))
    }

    handleResize = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
        this.handleRender()
    }

    componentDidMount() {
        if (this.props.history.location.pathname !== "/") this.handleGetSkin().then(this.handleRender)
        else this.handleRender()

        window.addEventListener("resize", this.handleResize)
        this.props.history.listen(() => this.handleGetSkin().then(this.handleRender))
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize)
        this.root.removeChild(this.renderer.domElement)
    }

    render() {
        return (
            <div className="ThreeDimensionSkin" ref={(element) => this.root = element}>
                {
                    this.props.history.location.pathname !== "/" ?
                    (
                        <Helmet>
                            <title>{this.state.name} - GTA San Andreas 3D Skins</title>
                        </Helmet>
                    ) :
                    null
                }

                <button className="ThreeDimensionSkin__navigation-button ThreeDimensionSkin__navigation-button--left"
                    onClick={this.handlePrevious}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                    </svg>
                </button>

                <button className="ThreeDimensionSkin__navigation-button ThreeDimensionSkin__navigation-button--right"
                    onClick={this.handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                    </svg>
                </button>

                <div className="ThreeDimensionSkin__meta">
                    <h1>
                        <span>{this.state.name}</span>
                    </h1>

                    <h2>
                        <span>{`Id: ${this.state.id}`}</span>
                        <span>{`Model: ${this.state.model}`}</span>
                    </h2>

                    <h2>
                        <span>{`Gender: ${this.state.gender}`}</span>
                        <span>{`Light Intensity: ${this.state.lightingIntensity}`}</span>
                    </h2>

                    <h2 className="ThreeDimensionSkin__meta__author">
                        <span>By: Mohamed Seif Khalid</span>
                    </h2>
                </div>
            </div>
        )
    }
}

export default ThreeDimensionSkin