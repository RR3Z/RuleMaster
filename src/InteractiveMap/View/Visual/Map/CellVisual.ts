import { Graphics } from 'pixi.js'
import { EntityType } from '../../../_Enums/EntityType'
import { CellVisualData } from '../../../_Types/Map'

export default class CellVisual extends Graphics {
	constructor(data: CellVisualData, cellSize: number) {
		super()
		this.draw(data, cellSize)
	}

	private draw(data: CellVisualData, cellSize: number) {
		this.rect(data.x * cellSize, data.y * cellSize, cellSize, cellSize).fill(
			0xff0000
		)
		if (data.type === EntityType.BOUNDARY) this.alpha = 0.5
		else this.alpha = 0
	}
}
