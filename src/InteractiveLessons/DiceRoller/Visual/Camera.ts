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
	}

	public updateSizes(): void {
		const width = window.innerWidth
		const height = window.innerHeight
		const aspectRatio = width / height
		const frustumSize = 52

		this.left = (frustumSize * aspectRatio) / -2
		this.right = (frustumSize * aspectRatio) / 2
		this.top = frustumSize / 2
		this.bottom = frustumSize / -2

		this.updateProjectionMatrix()
	}
}
