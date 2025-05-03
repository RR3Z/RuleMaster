import { Container, Graphics, Rectangle } from 'pixi.js'
import { Observable, Subject } from 'rxjs'
import InteractiveMapVisualUtils from '../../../Utils/InteractiveMapVisualUtils'
import { CharacterVisualData } from '../../_Types/ChararcterVisualData'
import { Position } from '../../_Types/Position'

export default class Token extends Graphics {
	protected _worldSpaceContainer: Container
	protected _radius: number
	protected _pos$: Subject<Position>

	protected _visualUtils: InteractiveMapVisualUtils

	constructor(
		worldSpaceContainer: Container,
		radius: number,
		visualUtils: InteractiveMapVisualUtils
	) {
		super()

		this._worldSpaceContainer = worldSpaceContainer
		this._radius = radius
		this._visualUtils = visualUtils
		this._pos$ = new Subject<Position>()
	}

	public get pos$(): Observable<Position> {
		return this._pos$.asObservable()
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
