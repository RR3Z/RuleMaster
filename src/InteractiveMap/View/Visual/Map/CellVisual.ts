import { Graphics } from 'pixi.js'
import { EntityType } from '../../../Model/Entities/Entity.ts'

export default class CellVisual extends Graphics {
	// TODO: REMOVE TYPE IN THE END
	constructor(
		x: number,
		y: number,
		cellSize: number,
		type: EntityType | undefined
	) {
		super()
		this.draw(x, y, cellSize, type)
	}

	private draw(
		x: number,
		y: number,
		cellSize: number,
		type: EntityType | undefined
	) {
		this.rect(x * cellSize, y * cellSize, cellSize, cellSize).fill(0xff0000)
		if (type === EntityType.BOUNDARY) this.alpha = 0.5
		else this.alpha = 0
	}
}
