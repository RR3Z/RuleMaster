import { Container, Graphics } from 'pixi.js'
import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import { GridSizes } from '../_Types/GridSizes'

export default class GridOfCellsVisual extends Container {
	// Settings
	public isBoundariesEnabled: boolean = true

	constructor(data: GridOfCellsVisualData, sizes: GridSizes) {
		super()

		this.draw(data, sizes)
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
}
