import { Position } from '@/InteractiveLessons/Types/Position'
import { Application, Container } from 'pixi.js'

export default abstract class InteractiveMapVisualEngine extends Application {
	protected _sceneObjects: Container

	constructor() {
		super()

		this._sceneObjects = new Container()
	}

	public async initialize(
		playerPos: Position,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'
	}
}
