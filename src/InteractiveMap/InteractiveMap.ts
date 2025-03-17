import config from './config.ts'
import Grid from './Logic/Grid.ts'
import VisualEngine from './Visual/VisualEngine.ts'

export default class InteractiveMap {
	private _grid: Grid
	private _visualEngine: VisualEngine

	constructor() {
		this._visualEngine = new VisualEngine()

		this._grid = new Grid(config.grid.width, config.grid.height) // TODO: TEMP SOLUTION
	}

	public async init(): Promise<void> {
		await this._visualEngine.init()
		this._visualEngine.setupScene(this._grid)

		document.body.appendChild(this._visualEngine.canvas)

		this.loop()
	}

	private loop(): void {
		this._visualEngine.onUpdate(() => {})
	}
}
