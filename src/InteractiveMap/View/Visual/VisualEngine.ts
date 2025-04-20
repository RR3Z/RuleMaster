import { Application, Container } from 'pixi.js'
import { MapVisualData } from '../../_Types/Map.ts'
import Camera from './Camera.ts'
import Token from './Characters/Token.ts'
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
		const gridVisual = new GridVisual(data.grid)
		this._sceneObjects.addChild(gridVisual)

		// Player
		this._sceneObjects.addChild(
			new Token(data.player, this._camera, gridVisual.cellSize)
		)
	}
}
