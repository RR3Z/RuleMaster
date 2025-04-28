import { Container, Graphics, Rectangle } from 'pixi.js'
import VisualUtils from '../../../Utils/VisualUtils'
import { CharacterVisualData } from '../../_Types/ChararcterVisualData'
import { Position } from '../../_Types/Position'

export default abstract class Token extends Graphics {
	protected _parent: Container
	protected _radius: number

	constructor(parent: Container, radius: number) {
		super()

		this._parent = parent
		this._radius = radius
	}

	protected draw(
		visualData: CharacterVisualData,
		radius: number,
		startPos: Position
	): void {
		const pos = VisualUtils.coordinatesToPixelPosition(
			startPos.x,
			startPos.y,
			radius
		)
		this.position = pos

		this.circle(0, 0, radius)
		this.fill(0x888888) // TODO: Change on picture from visualData

		this.hitArea = new Rectangle(-radius, -radius, radius * 2, radius * 2)

		this.eventMode = 'static'
		this.cursor = 'pointer'
	}
}
