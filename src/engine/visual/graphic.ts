import { Scene, WebGLRenderer } from "three"
import Camera from "./camera.ts"

export default class Graphic extends WebGLRenderer {
	public shouldUpdate: boolean
	private _scene: Scene
	private _camera: Camera
	private callbackUpdate!: () => void
	private callbackLoop: () => void

	constructor(scene: Scene, camera: Camera) {
		super({ alpha: true })

		// Canvas Name
		this.domElement.id = "diceRoller"

		this._scene = scene
		this._camera = camera
		this.shouldUpdate = false

		// WebGLRenderer Settings
		this.shadowMap.enabled = true
		this.setClearColor(0x000000, 0.5)
		this.setSize(window.innerWidth, window.innerHeight)
		this.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		this.callbackLoop = this.startLoop.bind(this)
	}

	public onUpdate(callback: () => void): void {
		this.callbackUpdate = callback
	}

	public startLoop(): void {
		if (this.shouldUpdate) {
			if (this.callbackUpdate) this.callbackUpdate()

			this.render(this._scene!, this._camera!)
			requestAnimationFrame(this.callbackLoop!)
		}
	}
}
