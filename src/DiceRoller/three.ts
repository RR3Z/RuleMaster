import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { selectedDices } from "../main.ts"

// #region Three.js
// #region Main Objects (Scene, Camera, Renderer)
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight
)
camera.position.set(0, 30, 0)
camera.rotation.set(-Math.PI / 2, 0, 0)

const canvas = document.querySelector("canvas") as HTMLCanvasElement | undefined
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
renderer.setClearColor(0x000000, 0.5)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// #endregion

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
hemisphereLight.position.set(0, 50, 0)
scene.add(hemisphereLight)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(-8, 12, 8)
dirLight.castShadow = true
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
scene.add(dirLight)
// #endregion

// #region Functions
export function updateScene() {
	window.requestAnimationFrame(updateScene)

	controls.update() // OrbitControls

	renderer.render(scene, camera)
}

function clearObjectsVisualization() {
	selectedDices.forEach(dice => {
		scene.remove(dice)
	})
}

export function addObjects() {
	clearObjectsVisualization()

	for (let i = 0; i < selectedDices.length; i++) {
		scene.add(selectedDices[i])
	}

	console.log("addObjects: ", selectedDices)
}

export function removeObjects() {
	clearObjectsVisualization()

	selectedDices.splice(0, selectedDices.length)
	console.log("removeObjects: ", selectedDices)
}
// #endregion
