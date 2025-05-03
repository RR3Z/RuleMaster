export default class GridOfCellsVisualUtils {
	private readonly _gridWidth: number
	private readonly _gridHeight: number

	constructor(gridWidth: number, gridHeight: number) {
		if (gridWidth <= 0 || gridHeight <= 0) {
			throw new Error('VisualUtils -> Grid Sizes are incorrect!')
		}
		this._gridWidth = gridWidth
		this._gridHeight = gridHeight
	}

	public coordinatesToPixelPosition(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		return {
			x: radius + x * radius * 2,
			y: radius + y * radius * 2,
		}
	}

	public pixelToCoordinatesPosition(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		return {
			x: Math.floor((x - radius) / (radius * 2)),
			y: Math.floor((y - radius) / (radius * 2)),
		}
	}

	public snapToCell(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		if (this._gridWidth === 0 || this._gridHeight === 0)
			throw new Error('VisualUtils -> Grid Sizes are incorrect!')

		const maxPosWidth = radius * 2 * this._gridWidth
		const maxPosHeight = radius * 2 * this._gridHeight
		let posX = Math.floor(x / (radius * 2)) * radius * 2 + radius
		let posY = Math.floor(y / (radius * 2)) * radius * 2 + radius

		if (x >= maxPosWidth) posX = maxPosWidth - radius * 2 + radius
		if (x < 0) posX = radius
		if (y >= maxPosHeight) posY = maxPosHeight - radius * 2 + radius
		if (y < 0) posY = radius

		return {
			x: posX,
			y: posY,
		}
	}
}
