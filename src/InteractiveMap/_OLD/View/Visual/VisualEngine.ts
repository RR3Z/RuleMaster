import { Application, Container } from 'pixi.js'
import { MapVisualData } from '../../_Types/Map.ts'
import Enemy from '../../Model/Entities/Characters/Enemy.ts'
import Player from '../../Model/Entities/Characters/Player.ts'
import Camera from './Camera.ts'
import PlayerToken from './Characters/PlayerToken.ts'
import GridVisual from './Map/GridVisual.ts'

export default class VisualEngine extends Application {
	private _sceneObjects!: Container

	private _camera!: Camera
	private _grid!: GridVisual
	public player!: PlayerToken

	constructor() {
		super()
	}

	public async init(): Promise<void> {
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'

		document.body.append(this.canvas)
	}

	public initScene(
		data: MapVisualData,
		player: Player,
		enemies: Set<Enemy>
	): void {
		// Camera
		this._camera = new Camera(this.renderer)
		this.stage.addChild(this._camera)

		// Container for Objects
		this._sceneObjects = new Container()
		this._camera.addChild(this._sceneObjects)

		// Grid
		this._grid = new GridVisual(data.grid)
		this._sceneObjects.addChild(this._grid)

		// Player
		this.player = new PlayerToken(
			data.player,
			this._camera,
			this._grid.cellSize,
			player
		)
		this._sceneObjects.addChild(this.player)
	}
}
