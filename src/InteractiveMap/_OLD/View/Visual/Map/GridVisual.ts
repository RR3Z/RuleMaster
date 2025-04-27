import { Container, Graphics } from 'pixi.js'
import { CellVisualData, GridVisualData } from '../../../_Types/Map.ts'
import CellVisual from './CellVisual.ts'

export default class GridVisual extends Container {
	public isDebugEnabled: boolean = true
	public isBoundariesEnabled: boolean = true

	public cellColor: number = 0x333333
	public cellSize: number = 50

	private _cellVisuals!: CellVisual[][]

	constructor(data: GridVisualData) {
		super()

		this.draw(data)
	}

	private draw(data: GridVisualData): void {
		const height = data.height
		const width = data.width

		if (this.isDebugEnabled) this.drawDebug(data)

		// Vertical lines
		for (
			let i = this.isBoundariesEnabled ? 0 : 1;
			i < width + (this.isBoundariesEnabled ? 1 : 0);
			i++
		) {
			const line = new Graphics()
				.moveTo(i * this.cellSize, 0)
				.lineTo(i * this.cellSize, this.cellSize * height)
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
				.moveTo(0, i * this.cellSize)
				.lineTo(this.cellSize * width, i * this.cellSize)
				.stroke({ color: this.cellColor, pixelLine: true })
			this.addChild(line)
		}
	}

	private drawDebug(data: GridVisualData): void {
		const height = data.height
		const width = data.width

		this._cellVisuals = Array.from({ length: height }, () =>
			Array.from({ length: width } as CellVisual[])
		)

		const cells = new Set<CellVisualData>(data.cells)
		cells.forEach((cell: CellVisualData) => {
			this._cellVisuals[cell.pos.x][cell.pos.y] = new CellVisual(
				cell,
				this.cellSize
			)
			this.addChild(this._cellVisuals[cell.pos.x][cell.pos.y])
		})
	}
}
