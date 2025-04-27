import { Container, FederatedPointerEvent } from 'pixi.js'
import { Subject } from 'rxjs'
import {
	CharacterPosition,
	TokenVisualData,
} from '../../../_Types/Characters.ts'
import { Position } from '../../../_Types/Map.ts'
import Character from '../../../Model/Entities/Characters/Character.ts'
import VisualUtils from '../../../VisualUtils.ts'
import Token from './Token.ts'

export default class PlayerToken extends Token {
	// Fields
	private _character: Character
	private _isDragging: boolean

	// Events
	public positionChanged$: Subject<CharacterPosition>

	constructor(
		data: TokenVisualData,
		parent: Container,
		cellSize: number,
		character: Character
	) {
		super()

		this._parent = parent
		this._isDragging = false
		this._radius = cellSize / 2
		this._character = character
		this.positionChanged$ = new Subject<CharacterPosition>()

		this.init(data)

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
			const newPos: Position = VisualUtils.pixelToCoordinatesPosition(
				this.position.x,
				this.position.y,
				this._radius
			)
			this.positionChanged$.next({
				pos: newPos,
				character: this._character,
			})
		}
	}
}
