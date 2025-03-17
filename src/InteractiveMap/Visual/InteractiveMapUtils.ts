import config from '../config.ts'

export default class InteractiveMapUtils {
	public static coordinatesToPixelPosition(
		x: number,
		y: number
	): { x: number; y: number } {
		return {
			x: config.grid.cellSize / 2 + x * config.grid.cellSize,
			y: config.grid.cellSize / 2 + y * config.grid.cellSize,
		}
	}

	public static snapToCell(x: number, y: number): { x: number; y: number } {
		const cellSize = config.grid.cellSize
		const offsetX = cellSize / 2
		const offsetY = cellSize / 2
		const maxPosWidth = cellSize * config.grid.width
		const maxPosHeight = cellSize * config.grid.height
		let posX = Math.floor(x / cellSize) * cellSize + offsetX
		let posY = Math.floor(y / cellSize) * cellSize + offsetY

		if (x >= maxPosWidth) posX = maxPosWidth - cellSize + offsetX
		if (x < 0) posX = offsetX
		if (y >= maxPosHeight) posY = maxPosHeight - cellSize + offsetY
		if (y < 0) posY = offsetY

		return {
			x: posX,
			y: posY,
		}
	}
}
