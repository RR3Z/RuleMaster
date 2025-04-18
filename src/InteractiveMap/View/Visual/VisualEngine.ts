import { Application, Container } from 'pixi.js'
import { MapVisualData } from '../../_Types/Map.ts'
import Camera from './Camera.ts'
import GridVisual from './Map/GridVisual.ts'

export default class VisualEngine extends Application {
	private _sceneObjects!: Container
	private _camera!: Camera

	constructor() {
		super()
	}

	public async init(): Promise<void> {
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'

		document.body.append(this.canvas)
	}

	public initScene(data: MapVisualData): void {
		// Camera
		this._camera = new Camera(this.renderer)
		this.stage.addChild(this._camera)

		// Container for Objects
		this._sceneObjects = new Container()
		this._camera.addChild(this._sceneObjects)

		// Grid
		this._sceneObjects.addChild(new GridVisual(data.grid))
	}
}
