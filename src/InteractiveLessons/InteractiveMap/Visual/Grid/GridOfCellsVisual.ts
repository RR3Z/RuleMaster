import { Container, Graphics, Sprite } from 'pixi.js'
import { CellVisualData } from '../../Types/CellVisualData'
import CellVisual from './CellVisual'

export default class GridOfCellsVisual extends Container {
	// Settings
	public isBoundariesEnabled: boolean = true
	private _width: number
	private _height: number

	// Fields
	private _cellsVisual: CellVisual[][]
	private _backgroundSprite!: Sprite

	constructor(
		background: Sprite,
		cellVisual: CellVisualData,
		width: number,
		height: number
	) {
		super()

		this._width = width
		this._height = height
		this._cellsVisual = []

		this.setBackground(background, width, height, cellVisual.size)
		this.draw(cellVisual, width, height)
		this.createCellsVisual(cellVisual)
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
		cellVisual: CellVisualData,
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
				.moveTo(i * cellVisual.size, 0)
				.lineTo(i * cellVisual.size, cellVisual.size * height)
				.stroke({
					width: 1,
					color: cellVisual.color,
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
				.moveTo(0, i * cellVisual.size)
				.lineTo(cellVisual.size * width, i * cellVisual.size)
				.stroke({
					width: 1,
					color: cellVisual.color,
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

	private setBackground(
		background: Sprite,
		width: number,
		height: number,
		cellSize: number
	): void {
		this._backgroundSprite = new Sprite(background)
		this._backgroundSprite.width = width * cellSize
		this._backgroundSprite.height = height * cellSize
		this.sortableChildren = true
		this._backgroundSprite.zIndex = -1
		this.addChild(this._backgroundSprite)
	}
}
