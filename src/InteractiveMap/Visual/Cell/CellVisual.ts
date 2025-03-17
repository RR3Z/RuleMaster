import { Graphics } from 'pixi.js'
import config from '../../config.ts'
import Cell from '../../Logic/Cell.ts'

export default class CellVisual extends Graphics {
	private _cell: Cell

	constructor(cell: Cell) {
		super()

		this._cell = cell
		this.init()
	}

	private init(): void {
		this.rect(
			this._cell.x * config.grid.cellSize,
			this._cell.y * config.grid.cellSize,
			config.grid.cellSize,
			config.grid.cellSize
		).fill(0xff0000)
		this.alpha = 0
	}
}
