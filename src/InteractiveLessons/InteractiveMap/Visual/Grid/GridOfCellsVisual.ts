import { Container, Graphics } from 'pixi.js'
import { CellVisualData } from '../../Types/CellVisualData'
import CellVisual from './CellVisual'
import { GridOfCellsVisualData } from './GridOfCellsVisualData'

export default class GridOfCellsVisual extends Container {
	// Settings
	public isBoundariesEnabled: boolean = true
	private _width: number
	private _height: number

	// Fields
	private _cellsVisual: CellVisual[][]

	constructor(data: GridOfCellsVisualData, width: number, height: number) {
		super()

		this._width = width
		this._height = height
		this._cellsVisual = []

		this.draw(data, width, height)
		this.createCellsVisual(data.cellVisual)
	}

	public get width(): number {
		return this._width
	}

	public get height(): number {
		return this._height
	}

	public get cellsVisual(): CellVisual[][] {
		return this._cellsVisual
	}

	private draw(
		data: GridOfCellsVisualData,
		width: number,
		height: number
	): void {
		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * data.cellVisual.size, 0)
				.lineTo(i * data.cellVisual.size, data.cellVisual.size * height)
				.stroke({
					width: 1,
					color: data.cellVisual.color,
					alpha: 1,
				})
			this.addChild(line)
		}

		// Horizontal lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < height + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(0, i * data.cellVisual.size)
				.lineTo(data.cellVisual.size * width, i * data.cellVisual.size)
				.stroke({
					width: 1,
					color: data.cellVisual.color,
					alpha: 1,
				})
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
