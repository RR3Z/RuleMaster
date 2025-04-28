import { Container, FederatedPointerEvent } from 'pixi.js'
import { Observable, Subject } from 'rxjs'
import VisualUtils from '../../../Utils/VisualUtils'
import { CharacterVisualData } from '../../_Types/ChararcterVisualData'
import { Position } from '../../_Types/Position'
import Token from './Token'

export type DraggableTokenParams = {
	visualData: CharacterVisualData
	startPos: Position
	radius: number
	parentContainer: Container
}

export default class DraggableToken extends Token {
	private _isDragging: boolean
	private _radius: number
	private _pos$: Subject<Position>

	constructor(params: DraggableTokenParams) {
		super(params.parentContainer)

		this._isDragging = false
		this._radius = params.radius
		this._pos$ = new Subject<Position>()

		this.draw(params.visualData, params.radius, params.startPos)

		this.on('pointerdown', this.onDragStart, this)
		this.on('pointerup', this.onDragEnd, this)
		this.on('pointerupoutside', this.onDragEnd, this)
	}

	public get pos$(): Observable<Position> {
		return this._pos$.asObservable()
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
			const newPos: Position = VisualUtils.pixelToCoordinatesPosition(
				this.position.x,
				this.position.y,
				this._radius
			)
			this._pos$.next(newPos)
		}
	}
}
