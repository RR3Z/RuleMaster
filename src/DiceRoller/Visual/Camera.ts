import { OrthographicCamera } from 'three'

export default class Camera extends OrthographicCamera {
	// private _scale: number

	constructor() {
		super()

		this.updateSizes()
		// super(75, innerWidth / innerHeight)

		this.position.set(0, 100, 0)
		this.lookAt(0, 0, 0)
		this.up.set(0, 0, -1)
	}

	public get viewportSizes(): { width: number; height: number } {
		const width = this.right - this.left
		const height = this.top - this.bottom
		return { width, height }

		// const distance = Math.abs(this.position.y) // Расстояние от камеры до объекта
		// const fov = this.fov * (Math.PI / 180) // Преобразуем FOV в радианы
		// const cameraHeight = 2 * Math.tan(fov / 2) * distance // Высота видимой области
		// const aspectRatio = window.innerWidth / window.innerHeight
		// const cameraWidth = cameraHeight * aspectRatio
		// return { width: cameraWidth, height: cameraHeight }
	}

	public updateSizes(): void {
		const aspectRatio = window.innerWidth / window.innerHeight

		// World Bounds (взято из DiceRollerPhysicEngine -> createWorldBounds)
		let width = 107
		let height = 53

		// Корректировка с учетом соотношения сторон окна
		if (aspectRatio >= 1) {
			// Ширина окна больше высоты
			width = height * aspectRatio
		} else {
			// Высота окна больше ширины
			height = width / aspectRatio
		}

		// Устанавливаем параметры ортографической камеры
		const halfWidth = width / 2
		const halfHeight = height / 2

		this.left = -halfWidth
		this.right = halfWidth
		this.top = halfHeight
		this.bottom = -halfHeight

		this.updateProjectionMatrix()
	}
}
