import { Container, FederatedPointerEvent, Graphics, Rectangle } from 'pixi.js'
import { CharacterVisualData } from '../../../_Types/Characters.ts'
import VisualUtils from '../../../VisualUtils.ts'

export default class Token extends Graphics {
	private _parent: Container
	private _isDragging: boolean
	private _radius: number

	constructor(data: CharacterVisualData, parent: Container, cellSize: number) {
		super()

		this._parent = parent
		this._isDragging = false
		this._radius = cellSize / 2

		this.init(data)
		this.subscribe()
	}

	private init(data: CharacterVisualData): void {
		const pos = VisualUtils.coordinatesToPixelPosition(
			data.x,
			data.y,
			this._radius
		)
		this.position = pos

		this.circle(0, 0, this._radius)
		this.fill(0x888888) // TODO: Change on picture

		this.hitArea = new Rectangle(
			-this._radius,
			-this._radius,
			this._radius * 2,
			this._radius * 2
		)

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
