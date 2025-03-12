import { Application, Container } from 'pixi.js'
import Grid from '../logic/Grid.ts'
import Camera from './Camera.ts'
import GridVisual from './GridVisual.ts'

export default class VisualEngine extends Application {
	private _scene!: Container
	private _camera!: Camera
	private callbackUpdate!: () => void

	constructor() {
		super()
	}

	public async init(grid: Grid): Promise<void> {
		// Pixi.Js Initialization
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'

		// Objects Initialization
		this._camera = new Camera(this.renderer, {
			width: window.innerWidth,
			height: window.innerHeight,
		})
		this._scene = new Container()

		// Scene Setup
		this.stage.addChild(this._camera)
		this._camera.addChild(this._scene) // Make objects move with camera
		this._scene.addChild(new GridVisual(grid))
		this._camera.updateSettings()

		// Start Update Loop
		this.startLoop()
	}

	public onUpdate(callback: () => void): void {
		this.callbackUpdate = callback
	}

	private startLoop(): void {
		this.ticker.add(() => {
			if (this.callbackUpdate) this.callbackUpdate()
		})
	}
}
