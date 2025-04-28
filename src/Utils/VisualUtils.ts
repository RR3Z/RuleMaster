export default class VisualUtils {
	public static gridWidth: number = 0
	public static gridHeight: number = 0

	public static coordinatesToPixelPosition(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		return {
			x: radius + x * radius * 2,
			y: radius + y * radius * 2,
		}
	}

	public static pixelToCoordinatesPosition(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		return {
			x: Math.floor((x - radius) / (radius * 2)),
			y: Math.floor((y - radius) / (radius * 2)),
		}
	}

	public static snapToCell(
		x: number,
		y: number,
		radius: number
	): { x: number; y: number } {
		if (this.gridWidth === 0 || this.gridHeight === 0)
			throw new Error('VisualUtils -> Grid Sizes are incorrect!')

		const maxPosWidth = radius * 2 * this.gridWidth
		const maxPosHeight = radius * 2 * this.gridHeight
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
