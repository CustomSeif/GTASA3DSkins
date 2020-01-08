import React, { Component } from "react"
import * as THREE from "three"
import OrbitControls_ from "three-orbit-controls"
import GLTFLoader from "three-gltf-loader"
import model from "./maddogg.glb"

const OrbitControls = OrbitControls_(THREE)

class ThreeDimensionSkin extends Component {
    componentDidMount() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setClearColor( 0xDDDDDD )
        this.root.appendChild( this.renderer.domElement )

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        this.light = new THREE.AmbientLight( 0xEEEEEE, 2 )

        this.controls.autoRotate = true
        this.camera.position.z = 1.5
        this.scene.add( this.light )

        this.GLTFLoader = new GLTFLoader()

        this.GLTFLoader.load(
            `https://res.cloudinary.com/custom/raw/upload/v1541334961/Skins/Models/vwmybox.glb`,
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

    componentWillUnmount() {
        this.root.removeChild( this.renderer.domElement )
    }

    render() {
        return (
            <div className="ThreeDimensionSkin" ref={(element) => this.root = element}>
            </div>
        )
    }
}

export default ThreeDimensionSkin