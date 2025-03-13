import config from './config.ts'
import Grid from './logic/Grid.ts'
import VisualEngine from './visual/VisualEngine.ts'

export default class InteractiveMap {
	private _grid: Grid
	private _visualEngine: VisualEngine

	constructor() {
		this._visualEngine = new VisualEngine()

		this._grid = new Grid(config.grid.width, config.grid.height) // TODO: TEMP SOLUTION
	}

	public get visualEngine() {
		return this._visualEngine
	}

	public async init(): Promise<void> {
		await this.visualEngine.init(this._grid)

		document.body.appendChild(this.visualEngine.canvas)

		this.loop()
	}

	private loop(): void {
		this.visualEngine.onUpdate(() => {})
	}
}
