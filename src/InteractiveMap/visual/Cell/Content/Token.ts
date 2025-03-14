import { Container, FederatedPointerEvent, Graphics } from 'pixi.js'
import config from '../../../config.ts'
import { coordinatesToPixelPosition, snapToCell } from '../../../utils.ts'

export default class Token extends Graphics {
	private _isDragging: boolean
	private _scene: Container

	constructor(scene: Container, x: number, y: number) {
		super()

		this.init(x, y)
		this._scene = scene
		this._isDragging = false

		// Events
		this.on('pointerdown', this.onDragStart, this)
		this.on('pointerup', this.onDragEnd, this)
		this.on('pointerupoutside', this.onDragEnd, this)
	}

	private init(x: number, y: number): void {
		const pos = coordinatesToPixelPosition(x, y)
		const radius = config.grid.cellSize / 2

		this.circle(0, 0, radius)
		this.fill(0x888888)

		this.position = pos

		this.eventMode = 'static'
		this.cursor = 'pointer'
	}

	private onDragStart(event: FederatedPointerEvent) {
		if (event.button === 0) {
			this.alpha = 0.5
			this._isDragging = true
			this._scene.on('pointermove', this.onDragMove, this)
		}
	}

	private onDragEnd(event: FederatedPointerEvent) {
		if (this._isDragging) {
			this._scene.off('pointermove', this.onDragMove, this)
			this.alpha = 1
			this._isDragging = false
		}
	}

	private onDragMove(event: FederatedPointerEvent) {
		if (this._isDragging) {
			// Convert global position to local
			this.parent.toLocal(event.global, undefined, this.position)
			// Snap Token to Cell
			this.position = snapToCell(this.position.x, this.position.y)
		}
	}
}
