import { Container, FederatedPointerEvent, Graphics } from 'pixi.js'
import { CharacterVisualData } from '../../../_Types/Characters.ts'
import VisualUtils from '../../../VisualUtils.ts'

export default class Token extends Graphics {
	private _parent: Container
	private _isDragging: boolean

	private _gridPosition: { x: number; y: number }

	constructor(data: CharacterVisualData, parent: Container) {
		super()

		this._parent = parent
		this._isDragging = false
		this._gridPosition = { x: data.x, y: data.y }

		this.init(data)
		this.subscribe()
	}

	private init(data: CharacterVisualData): void {
		const pos = VisualUtils.coordinatesToPixelPosition(
			data.x,
			data.y,
			data.radius
		)
		this.position = pos

		this.circle(0, 0, data.radius)
		this.fill(0x888888) // TODO: Change on picture

		this.eventMode = 'static'
		this.cursor = 'pointer'
	}

	private subscribe(): void {
		this.on('pointerdown', this.onDragStart, this)
		this.on('pointerup', this.onDragEnd, this)
		this.on('pointerupoutside', this.onDragEnd, this)
	}

	private onDragStart(event: FederatedPointerEvent): void {
		if (event.button === 0) {
			this.alpha = 0.5
			this._isDragging = true
			this._parent.on('pointermove', this.onDragMove, this)
		}
	}

	private onDragMove(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			// Convert global position to local
			this.parent.toLocal(event.global, undefined, this.position)
			// Snap Token to Cell
			this.position = VisualUtils.snapToCell(
				this.position.x,
				this.position.y,
				this.getBounds().width / 2
			)
		}
	}

	private onDragEnd(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			this._parent.off('pointermove', this.onDragMove, this)
			this.alpha = 1
			this._isDragging = false
		}
	}
}
