import { Graphics } from 'pixi.js'
import { CellVisualData } from '../../../_Types/Map'

export default class CellVisual extends Graphics {
	constructor(data: CellVisualData, cellSize: number) {
		super()
		this.draw(data, cellSize)
	}

	private draw(data: CellVisualData, cellSize: number) {
		this.rect(data.pos.x * cellSize, data.pos.y * cellSize, cellSize, cellSize)
		this.alpha = 0.5

		if (data.color !== undefined) this.fill(data.color)
	}
}
