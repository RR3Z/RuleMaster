import { Container, Graphics } from 'pixi.js'
import { CellVisualData } from '../_Types/CellVisualData'
import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import { GridSizes } from '../_Types/GridSizes'
import CellVisual from './CellVisual'

export default class GridOfCellsVisual extends Container {
	// Settings
	public isBoundariesEnabled: boolean = true
	// Fields
	private _cellsVisual: CellVisual[][]

	constructor(data: GridOfCellsVisualData, sizes: GridSizes) {
		super()

		this._cellsVisual = []

		this.draw(data, sizes)
		this.createCellsVisual(data.cell)
	}

	public get cellsVisual(): Readonly<CellVisual[][]> {
		return this._cellsVisual
	}

	private draw(data: GridOfCellsVisualData, sizes: GridSizes): void {
		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < sizes.width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * data.cell.size, 0)
				.lineTo(i * data.cell.size, data.cell.size * sizes.height)
				.stroke({ color: data.cell.color, pixelLine: true })
			this.addChild(line)
		}

		// Horizontal lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < sizes.height + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(0, i * data.cell.size)
				.lineTo(data.cell.size * sizes.width, i * data.cell.size)
				.stroke({ color: data.cell.color, pixelLine: true })
			this.addChild(line)
		}
	}

	private createCellsVisual(visualData: CellVisualData): void {
		for (let x = 0; x < this._width; x++) {
			const column: CellVisual[] = []
			for (let y = 0; y < this._height; y++) {
				const cell = new CellVisual(visualData.size, { x: x, y: y })
				this.addChild(cell)
				column.push(cell)
			}
			this._cellsVisual.push(column)
		}
	}
}
