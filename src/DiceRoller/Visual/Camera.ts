import { OrthographicCamera } from 'three'

export default class Camera extends OrthographicCamera {
	private _scale: number

	constructor() {
		super()

		this._scale = 25
		const width = window.innerWidth / this._scale
		const height = window.innerHeight / this._scale

		this.left = -width / 2
		this.right = width / 2
		this.top = height / 2
		this.bottom = -height / 2
		this.updateProjectionMatrix()

		this.position.set(0, 30, 0)
		this.lookAt(0, 0, 0)
		this.up.set(0, 0, -1)
	}

	public get viewportSizes(): { width: number; height: number } {
		const width = this.right - this.left
		const height = this.top - this.bottom
		return { width, height }
	}

	public updateSizes(): void {
		const width = window.innerWidth / this._scale
		const height = window.innerHeight / this._scale

		this.left = -width / 2
		this.right = width / 2
		this.top = height / 2
		this.bottom = -height / 2

		this.updateProjectionMatrix()
	}
}
