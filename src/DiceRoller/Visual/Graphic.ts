import { Box3, Scene, WebGLRenderer } from 'three'
import Camera from './Camera'

export default class Graphic extends WebGLRenderer {
	public shouldUpdate: boolean
	private _scene: Scene
	private _camera: Camera
	private _callbackUpdate!: () => void
	private _callbackLoop: () => void

	constructor(scene: Scene, camera: Camera) {
		super({ alpha: true })

		// Canvas Name
		this.domElement.id = 'diceRoller'

		this._scene = scene
		this._camera = camera
		this.shouldUpdate = false

		// WebGLRenderer Settings
		this.shadowMap.enabled = true
		this.setClearColor(0x000000, 0.25)
		this.setSize(window.innerWidth, window.innerHeight)
		this.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		this._callbackLoop = this.startLoop.bind(this)

		this.addWindowResizeListener()
	}

	public startLoop(): void {
		if (this.shouldUpdate) {
			if (this._callbackUpdate) this._callbackUpdate()

			this.render(this._scene!, this._camera!)
			requestAnimationFrame(this._callbackLoop!)
		}
	}

	public onUpdate(callback: () => void): void {
		this._callbackUpdate = callback
	}

	private addWindowResizeListener(): void {
		window.addEventListener('resize', () => {
			this._camera.updateSizes()
			this.updateSceneScale()

			this.setSize(window.innerWidth, window.innerHeight)
			this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})
	}

	private updateSceneScale(): void {
		const boundingBox = new Box3().setFromObject(this._scene)

		const width = boundingBox.max.x - boundingBox.min.x
		const height = boundingBox.max.y - boundingBox.min.y

		const scaleFactor = Math.min(
			window.innerWidth / width,
			window.innerHeight / height
		)

		this._scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
	}
}
