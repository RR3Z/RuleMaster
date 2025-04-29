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
	worldSpaceContainer: Container
	visualUtils: VisualUtils
}

export default class DraggableToken extends Token {
	private _isDragging: boolean
	private _gridPos$: Subject<Position>

	constructor(params: DraggableTokenParams) {
		super(params.worldSpaceContainer, params.radius, params.visualUtils)

		this._isDragging = false
		this._gridPos$ = new Subject<Position>()

		this.draw(params.visualData, params.radius, params.startPos)

		this.on('pointerdown', this.onDragStart, this)
		this.on('pointerup', this.onDragEnd, this)
		this.on('pointerupoutside', this.onDragEnd, this)
	}

	public get gridPos$(): Observable<Position> {
		return this._gridPos$.asObservable()
	}

	private onDragStart(event: FederatedPointerEvent): void {
		if (event.button === 0) {
			this.alpha = 0.5
			this._isDragging = true
			this._worldSpaceContainer.on('pointermove', this.onDragMove, this)
		}
	}

	private onDragMove(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			// Convert global position to local
			this.parent.toLocal(event.global, undefined, this.position)
			// Snap Token to Cell
			this.position = this._visualUtils.snapToCell(
				this.position.x,
				this.position.y,
				this.getBounds().width / 2
			)
		}
	}

	private onDragEnd(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			this._worldSpaceContainer.off('pointermove', this.onDragMove, this)
			this.alpha = 1
			this._isDragging = false
			const newPos: Position = this._visualUtils.pixelToCoordinatesPosition(
				this.position.x,
				this.position.y,
				this._radius
			)
			this._gridPos$.next(newPos)
		}
	}
}
