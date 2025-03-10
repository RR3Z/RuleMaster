import { Container, Graphics } from 'pixi.js'

export default class Camera {
	private isMoving: boolean
	private lastPosition: { x: number; y: number }
	// Settings
	public scaleFactor: number = 1.1
	public maxPosOffset: number = 500

	constructor(mainScene: Container, canvas: HTMLCanvasElement) {
		this.isMoving = false
		this.lastPosition = { x: 0, y: 0 }

		this.init(mainScene, canvas)
	}

	private init(mainScene: Container, canvas: HTMLCanvasElement): void {
		const cameraBackground = new Graphics()
			.rect(
				-this.maxPosOffset,
				-this.maxPosOffset,
				canvas.width + this.maxPosOffset * 2,
				canvas.height + this.maxPosOffset * 2
			)
			.fill(0xffffff)
		cameraBackground.alpha = 0.2
		mainScene.addChild(cameraBackground)

		mainScene.eventMode = 'static'

		this.initMoveEvents(mainScene, canvas)
		this.initZoomEvents(mainScene, canvas)
	}

	private initMoveEvents(
		mainScene: Container,
		canvas: HTMLCanvasElement
	): void {
		mainScene.on('pointerdown', event => {
			this.isMoving = true
			this.lastPosition = { x: event.globalX, y: event.globalY }
		})

		mainScene.on('pointermove', event => {
			if (this.isMoving) {
				const newPosition = event.global
				mainScene.position.x += newPosition.x - this.lastPosition.x
				mainScene.position.y += newPosition.y - this.lastPosition.y
				this.lastPosition = { x: newPosition.x, y: newPosition.y }
			}
		})

		mainScene.on('pointerup', () => {
			this.isMoving = false
		})

		mainScene.on('pointerupoutside', () => {
			this.isMoving = false
		})
	}

	private initZoomEvents(
		mainScene: Container,
		canvas: HTMLCanvasElement
	): void {
		canvas.addEventListener('wheel', event => {
			if (event.deltaY < 0) {
				mainScene.scale.x *= this.scaleFactor
				mainScene.scale.y *= this.scaleFactor
			} else {
				mainScene.scale.x /= this.scaleFactor
				mainScene.scale.y /= this.scaleFactor
			}
		})
	}
}
