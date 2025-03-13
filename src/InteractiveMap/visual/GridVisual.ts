import { Container, Graphics } from 'pixi.js'
import config from '../config.ts'
import Cell from '../logic/Cell/Cell.ts'
import Grid from '../logic/Grid.ts'
import CellVisual from './Cell/CellVisual.ts'

export default class GridVisual extends Container {
	public isBoundariesEnabled: boolean
	private cellsVisual: CellVisual[]
	private cellColor: number = 0x333333

	constructor(grid: Grid, isBoundariesEnabled: boolean = true) {
		super()

		this.isBoundariesEnabled = isBoundariesEnabled
		this.cellsVisual = []

		this.init(grid.width, grid.height, grid.cells)
	}

	private init(width: number, height: number, cells: Cell[]): void {
		this.drawGrid(width, height)

		cells.forEach(cell => {
			const cellVisual = new CellVisual(cell)
			this.cellsVisual.push(cellVisual)
			this.addChild(cellVisual)
		})
	}

	private drawGrid(width: number, height: number): void {
		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * config.grid.cellSize, 0)
				.lineTo(i * config.grid.cellSize, config.grid.cellSize * height)
				.stroke({ color: this.cellColor, pixelLine: true })
			this.addChild(line)
		}

		// Horizontal lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < height + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(0, i * config.grid.cellSize)
				.lineTo(config.grid.cellSize * width, i * config.grid.cellSize)
				.stroke({ color: this.cellColor, pixelLine: true })
			this.addChild(line)
		}
	}
}
