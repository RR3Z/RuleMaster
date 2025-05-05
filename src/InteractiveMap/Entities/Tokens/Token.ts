import { Container, Graphics, Rectangle } from 'pixi.js'
import { BehaviorSubject, Observable } from 'rxjs'
import { CharacterVisualData } from '../../_Types/ChararcterVisualData'
import { Position } from '../../_Types/Position'

export type TokenParams = {
	visualData: CharacterVisualData
	startPos: Position
	radius: number
	worldSpaceContainer: Container
}

export default class Token extends Graphics {
	protected _worldSpaceContainer: Container
	protected _radius: number
	protected readonly _pos$: BehaviorSubject<Position>

	constructor(params: TokenParams) {
		super()

		this._worldSpaceContainer = params.worldSpaceContainer
		this._radius = params.radius
		this._pos$ = new BehaviorSubject<Position>(params.startPos)

		this.draw(params.visualData, params.radius, params.startPos)
	}

	public get pos$(): Observable<Position> {
		return this._pos$.asObservable()
	}

	public get pos(): Position {
		return this._pos$.value
	}

	protected draw(
		visualData: CharacterVisualData,
		radius: number,
		startPos: Position
	): void {
		this.position = startPos

		this.circle(0, 0, radius)
		this.fill(0x888888) // TODO: Change on picture from visualData

		this.hitArea = new Rectangle(-radius, -radius, radius * 2, radius * 2)

		this.eventMode = 'static'
		this.cursor = 'pointer'
	}
}
