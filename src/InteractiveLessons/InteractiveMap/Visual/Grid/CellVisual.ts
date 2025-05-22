import { Position } from '@/InteractiveLessons/Types/Position'
import { Container, Graphics } from 'pixi.js'

export default class CellVisual extends Container {
	private _visual: Graphics

	constructor(size: number, pos: Position) {
		super()

		this._visual = new Graphics()
		this.addChild(this._visual)

		this.draw(size, pos)
		this.interactive = true
		this.eventMode = 'static'
	}

	private draw(size: number, pos: Position): void {
		this._visual.clear()

		this._visual.rect(pos.x * size, pos.y * size, size, size)
		this._visual.fill(0xffffff)
		this._visual.alpha = 0
	}

	public highlight(color: number): void {
		this._visual.fill(color)
		this._visual.alpha = 0.5
	}

	public clearHighlight(): void {
		this._visual.alpha = 0
	}
}
