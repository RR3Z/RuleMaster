import { Application, Container } from 'pixi.js'
import Grid from '../Logic/Grid.ts'
import Camera from './Camera.ts'
import Token from './Cell/Content/Token.ts'
import GridVisual from './GridVisual.ts'

export default class VisualEngine extends Application {
	private _scene!: Container
	private _camera!: Camera
	private callbackUpdate!: () => void

	constructor() {
		super()
	}

	public async init(): Promise<void> {
		// Pixi.Js Initialization
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'

		// Objects Initialization
		this._camera = new Camera(this.renderer)
		this._scene = new Container()

		// Start Update Loop
		this.startLoop()
	}

	public setupScene(grid: Grid): void {
		// Scene Setup
		this.stage.addChild(this._camera)
		this._camera.addChild(this._scene) // Make objects move with camera
		this._scene.addChild(new GridVisual(grid))
		this._scene.addChild(new Token(this._camera, 25, 15))

		this._camera.updateSettings()
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
