import { Container, Graphics, Rectangle } from 'pixi.js'
import VisualUtils from '../../../Utils/VisualUtils'
import { CharacterVisualData } from '../../_Types/ChararcterVisualData'
import { Position } from '../../_Types/Position'

export default abstract class Token extends Graphics {
	protected _worldSpaceContainer: Container
	protected _radius: number

	protected _visualUtils: VisualUtils

	constructor(
		worldSpaceContainer: Container,
		radius: number,
		visualUtils: VisualUtils
	) {
		super()

		this._worldSpaceContainer = worldSpaceContainer
		this._radius = radius
		this._visualUtils = visualUtils
	}

	protected draw(
		visualData: CharacterVisualData,
		radius: number,
		startPos: Position
	): void {
		const pos = this._visualUtils.coordinatesToPixelPosition(
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
