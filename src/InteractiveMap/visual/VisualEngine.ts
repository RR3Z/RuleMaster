import { Application, Container } from 'pixi.js'
import Grid from '../logic/Grid.ts'
import Camera from './Camera.ts'
import GridVisual from './GridVisual.ts'

export default class VisualEngine extends Application {
	private _scene: Container
	private _camera!: Camera
	private callbackUpdate!: () => void

	constructor() {
		super()

		this._scene = new Container()
	}

	public get scene(): Container {
		return this._scene
	}

	public async initialize(grid: Grid): Promise<void> {
		await this.init({ resizeTo: window })
		this._camera = new Camera(this.stage, this.canvas)

		this.canvas.id = 'interactiveMap'

		this.scene.addChild(new GridVisual(grid))
		this.stage.addChild(this.scene)

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
