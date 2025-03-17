import { PerspectiveCamera } from 'three'

export default class DiceRollerUtils {
	public static getViewportSizes(camera: PerspectiveCamera): {
		width: number
		height: number
	} {
		const distance = Math.abs(camera.position.y) // Расстояние от камеры до объекта
		const fov = camera.fov * (Math.PI / 180) // Преобразуем FOV в радианы
		const cameraHeight = 2 * Math.tan(fov / 2) * distance // Высота видимой области
		const aspectRatio = window.innerWidth / window.innerHeight
		const cameraWidth = cameraHeight * aspectRatio

		return { width: cameraWidth, height: cameraHeight }
	}
}
