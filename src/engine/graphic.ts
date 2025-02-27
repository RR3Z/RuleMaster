import { Clock, Object3D, Scene, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { selectedDices } from "../main.ts"
import Camera from "./camera.ts"

export default class Graphic extends WebGLRenderer {
	private scene: Scene | null = null
	private camera: Camera | null = null
	private control: OrbitControls | null = null // TODO: REMOVE IT IN THE END
	private clock: Clock = new Clock()
	private callbackUpdate: ((dt?: number) => void) | null = null
	private callbackLoop: (() => void) | null = null

	constructor(scene: Scene, camera: Camera, canvas: HTMLCanvasElement) {
		super({ canvas, alpha: true })

		// Fields
		this.scene = scene
		this.camera = camera

		// Orbit Controls TODO: REMOVE IT IN THE END
		this.control = new OrbitControls(camera, canvas)
		this.control.enableDamping = true

		// WebGLRenderer settings
		this.shadowMap.enabled = true
		this.setClearColor(0x000000, 0.5)
		this.setSize(window.innerWidth, window.innerHeight)
		this.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		this.callbackLoop = this.loop.bind(this) // bind - связь экземпляра класса и функции
		this.loop()
	}

	public onUpdate(callback: (dt?: number) => void): void {
		this.callbackUpdate = callback
	}

	public addObjects(objects: Object3D[]): void {
		objects.forEach(object => {
			this.scene!.add(object)
		})

		console.log("Add Dices:", this.scene!.children)
	}

	public clearScene(): void {
		selectedDices.forEach(dice => {
			this.scene!.remove(dice)
		})

		console.log("Clear Scene", this.scene!.children)
	}

	private loop(): void {
		//const dt = this.clock.getDelta()

		if (this.callbackUpdate) this.callbackUpdate()

		this.control!.update() // OrbitControls

		this.render(this.scene!, this.camera!)
		requestAnimationFrame(this.callbackLoop!)
	}
}
