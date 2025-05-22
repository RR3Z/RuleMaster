import { Position } from '@/InteractiveLessons/Types/Position'
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js'
import { BehaviorSubject, Observable } from 'rxjs'

export type TokenParams = {
	startPos: Position
	radius: number
	worldSpaceContainer: Container
	sprite?: Sprite
}

export default class Token extends Container {
	protected _worldSpaceContainer: Container
	protected _radius: number
	protected readonly _pos$: BehaviorSubject<Position>

	private _circle?: Graphics
	private _sprite?: Sprite

	constructor(params: TokenParams) {
		super()

		this._worldSpaceContainer = params.worldSpaceContainer
		this._radius = params.radius
		this._pos$ = new BehaviorSubject<Position>(params.startPos)

		this.draw(params.radius, params.startPos, params.sprite)
	}

	public get pos$(): Observable<Position> {
		return this._pos$.asObservable()
	}

	public get pos(): Position {
		return this._pos$.value
	}

	protected draw(radius: number, startPos: Position, sprite?: Sprite): void {
		this.position.set(startPos.x, startPos.y)

		if (sprite) {
			this._sprite = new Sprite(sprite)
			this._sprite.position.set(0)
			this._sprite.anchor.set(0.5)
			this._sprite.width = radius * 2
			this._sprite.height = radius * 2
			this.addChild(this._sprite)
		} else {
			this._circle = new Graphics()
			this._circle.circle(0, 0, radius)
			this._circle.fill(0x888888)
			this.addChild(this._circle)
		}

		this.hitArea = new Rectangle(-radius, -radius, radius * 2, radius * 2)

		this.eventMode = 'dynamic'
		this.interactive = true
		this.cursor = 'pointer'
	}
}
