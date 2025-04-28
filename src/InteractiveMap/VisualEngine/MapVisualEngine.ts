import { Application, Container } from 'pixi.js'

export default abstract class MapVisualEngine extends Application {
	protected _sceneObjects: Container

	constructor() {
		super()

		this._sceneObjects = new Container()
	}

	public async init(): Promise<void> {
		await super.init({ resizeTo: window })
		this.canvas.id = 'interactiveMap'

		document.body.append(this.canvas)
	}
}
