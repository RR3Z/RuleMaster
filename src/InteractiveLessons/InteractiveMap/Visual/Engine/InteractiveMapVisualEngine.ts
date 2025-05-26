import Character from '@/InteractiveLessons/Entities/Character/Character'
import { Application, Container } from 'pixi.js'

export default abstract class InteractiveMapVisualEngine extends Application {
	protected _sceneObjects: Container

	constructor() {
		super()

		this._sceneObjects = new Container()
	}

	public async initialize(
		player: Character,
		enemies: Character[],
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'
	}

	public abstract get charactersVisualFilePaths(): Map<string, string>
}
