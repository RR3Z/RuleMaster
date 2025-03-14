import config from './config.ts'

export function coordinatesToPixelPosition(
	x: number,
	y: number
): { x: number; y: number } {
	return {
		x: config.grid.cellSize / 2 + x * config.grid.cellSize,
		y: config.grid.cellSize / 2 + y * config.grid.cellSize,
	}
}

export function snapToCell(x: number, y: number): { x: number; y: number } {
	const cellSize = config.grid.cellSize
	const offsetX = cellSize / 2
	const offsetY = cellSize / 2

	return {
		x: Math.floor(x / cellSize) * cellSize + offsetX,
		y: Math.floor(y / cellSize) * cellSize + offsetY,
	}
}
