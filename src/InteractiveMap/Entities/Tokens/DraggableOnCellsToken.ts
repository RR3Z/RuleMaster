import { FederatedPointerEvent } from 'pixi.js'
import GridOfCellsVisualUtils from '../../../Utils/GridOfCellsVisualUtils'
import { Position } from '../../_Types/Position'
import Token, { TokenParams } from './Token'

export type DraggableOnCellsTokenParams = TokenParams & {
	visualUtils: GridOfCellsVisualUtils
}

export default class DraggableOnCellsToken extends Token {
	private _isDragging: boolean
	private _phantomToken: Token
	private _visualUtils: GridOfCellsVisualUtils

	constructor(params: DraggableOnCellsTokenParams) {
		super(params)

		this._isDragging = false
		this._visualUtils = params.visualUtils

		this._phantomToken = new Token({
			visualData: params.visualData,
			startPos: params.startPos,
			radius: params.radius,
			worldSpaceContainer: params.worldSpaceContainer,
		})
		this._phantomToken.alpha = 0

		this.updatePosition(params.startPos)

		this.on('pointerdown', this.onDragStart, this)
		this.on('pointerup', this.onDragEnd, this)
		this.on('pointerupoutside', this.onDragEnd, this)
	}

	public updatePosition(position: Position): void {
		const pos = this._visualUtils.coordinatesToPixelPosition(
			position.x,
			position.y,
			this._radius
		)
		this.position.set(pos.x, pos.y)
	}

	private onDragStart(event: FederatedPointerEvent): void {
		if (event.button === 0) {
			this.alpha = 0.7
			this._phantomToken.alpha = 0.5
			this._phantomToken.position.set(this.position.x, this.position.y)
			this._isDragging = true
			this._worldSpaceContainer.addChild(this._phantomToken)
			this._worldSpaceContainer.on('pointermove', this.onDragMove, this)
		}
	}

	private onDragMove(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			// Convert global position to local
			this.parent.toLocal(event.global, undefined, this._phantomToken.position)
			// Snap Token to Cell
			this._phantomToken.position = this._visualUtils.snapToCell(
				this._phantomToken.position.x,
				this._phantomToken.position.y,
				this._phantomToken.getBounds().width / 2
			)
		}
	}

	private onDragEnd(event: FederatedPointerEvent): void {
		if (this._isDragging) {
			this._worldSpaceContainer.off('pointermove', this.onDragMove, this)
			this._worldSpaceContainer.removeChild(this._phantomToken)
			this.alpha = 1
			this._phantomToken.alpha = 0
			this._isDragging = false
			const newPos: Position = this._visualUtils.pixelToCoordinatesPosition(
				this._phantomToken.position.x,
				this._phantomToken.position.y,
				this._radius
			)
			this._pos$.next(newPos)
		}
	}
}
