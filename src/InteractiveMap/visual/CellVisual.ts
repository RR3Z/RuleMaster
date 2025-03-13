import { FederatedPointerEvent, Graphics } from 'pixi.js'
import config from '../config.ts'
import Cell from '../logic/Cell/Cell.ts'

export default class CellVisual extends Graphics {
	private _cell: Cell

	constructor(cell: Cell) {
		super()

		this._cell = cell
		this.init()
	}

	private init(): void {
		// Visual
		this.rect(
			this._cell.x * config.grid.cellSize,
			this._cell.y * config.grid.cellSize,
			config.grid.cellSize,
			config.grid.cellSize
		).fill(0xff0000)
		this.alpha = 0

		// Interactivity
		this.eventMode = 'static'
		this.on('pointerdown', event => {
			this.onLeftButtonClick(event)
		})
	}

	private onLeftButtonClick(event: FederatedPointerEvent) {
		if (event.button === 0) {
			console.log(this._cell.coordinates)
		}
	}
}
