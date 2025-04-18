export default class VisualUtils {
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
		// const maxPosWidth = radius * 2 * width
		// const maxPosHeight = radius * 2 * height
		let posX = Math.floor(x / (radius * 2)) * radius * 2 + radius
		let posY = Math.floor(y / (radius * 2)) * radius * 2 + radius

		// if (x >= maxPosWidth) posX = maxPosWidth - radius * 2 + offsetX
		// if (x < 0) posX = offsetX
		// if (y >= maxPosHeight) posY = maxPosHeight - radius * 2 + offsetY
		// if (y < 0) posY = offsetY

		return {
			x: posX,
			y: posY,
		}
	}
}
