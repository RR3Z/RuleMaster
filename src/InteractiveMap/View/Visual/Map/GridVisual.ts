import { Container, Graphics } from 'pixi.js'
import { CellVisualData, GridVisualData } from '../../../_Types/Map.ts'
import CellVisual from './CellVisual.ts'

export default class GridVisual extends Container {
	public isDebugEnabled: boolean = true
	public isBoundariesEnabled: boolean = true

	public cellColor: number = 0x333333
	public cellSize: number = 50

	private _cellVisuals!: CellVisual[][]

	constructor(grid: GridVisualData) {
		super()

		this.draw(grid, this.cellSize)
	}

	private draw(grid: GridVisualData, cellSize: number): void {
		const height = grid.height
		const width = grid.width

		if (this.isDebugEnabled) this.drawDebug(grid, cellSize)

		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * cellSize, 0)
				.lineTo(i * cellSize, cellSize * height)
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
				.moveTo(0, i * cellSize)
				.lineTo(cellSize * width, i * cellSize)
				.stroke({ color: this.cellColor, pixelLine: true })
			this.addChild(line)
		}
	}

	private drawDebug(grid: GridVisualData, cellSize: number): void {
		const height = grid.height
		const width = grid.width

		this._cellVisuals = Array.from({ length: height }, () =>
			Array.from({ length: width } as CellVisual[])
		)

		const cells = new Set<CellVisualData>(grid.cells)
		cells.forEach((cell: CellVisualData) => {
			this._cellVisuals[cell.x][cell.y] = new CellVisual(cell, cellSize)
			this.addChild(this._cellVisuals[cell.x][cell.y])
		})
	}
}
