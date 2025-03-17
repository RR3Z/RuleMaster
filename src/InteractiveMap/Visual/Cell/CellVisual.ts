import { Graphics } from 'pixi.js'
import config from '../../config.ts'
import Cell from '../../Logic/Cell.ts'
import { EntityType } from '../../Logic/Entities/EntityType.ts'

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

		if (this._cell.contentType !== EntityType.BOUNDARY) this.alpha = 0
		else this.alpha = 0.5
	}
}
