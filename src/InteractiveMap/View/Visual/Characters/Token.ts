import { Container, Graphics, Rectangle } from 'pixi.js'
import { TokenVisualData } from '../../../_Types/Characters.ts'
import VisualUtils from '../../../VisualUtils.ts'

export default abstract class Token extends Graphics {
	// Fields
	protected _parent!: Container
	protected _isDragging!: boolean
	protected _radius!: number

	protected init(data: TokenVisualData): void {
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
}
