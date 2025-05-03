import { BehaviorSubject } from 'rxjs'
import { Position } from '../_Types/Position'
import { EntityType } from './EntityType'

export default abstract class Entity {
	protected readonly _entityType: EntityType
	public readonly pos$: BehaviorSubject<Position>

	constructor(type: EntityType, pos: Position) {
		this._entityType = type
		this.pos$ = new BehaviorSubject<Position>(pos)
	}

	public get type(): EntityType {
		return this._entityType
	}

	public get pos(): Readonly<Position> {
		return this.pos$.value
	}
}
