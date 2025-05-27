import { Position } from '@/InteractiveLessons/Types/Position'
import { Container, Graphics } from 'pixi.js'

export default class CellVisual extends Container {
	private _visual: Graphics
	private _pos: Position
	private _size: number
	private _currentColor: number

	constructor(size: number, pos: Position) {
		super()

		this._visual = new Graphics()
		this.addChild(this._visual)
		this._pos = pos
		this._size = size
		this._currentColor = 0xffffff
		this.draw(size, pos)
		this.interactive = true
		this.eventMode = 'static'
	}

	public get pos(): Position {
		return this._pos
	}

	private draw(size: number, pos: Position): void {
		this._visual.clear()

		this._visual.rect(pos.x * size, pos.y * size, size, size)
		this._visual.fill(this._currentColor)
		this._visual.alpha = 0
	}

	public highlight(color: number): void {
		if (this._currentColor !== color) {
			this._visual.clear()
			this._visual.rect(
				this._pos.x * this._size,
				this._pos.y * this._size,
				this._size,
				this._size
			)
			this._currentColor = color
			this._visual.fill(this._currentColor)
		}

		this._visual.alpha = 0.5
	}

	public clearHighlight(): void {
		this._visual.alpha = 0
	}
}
