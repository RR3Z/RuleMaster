import { BehaviorSubject, Observable } from 'rxjs'
import { Position } from '../Types/Position'
import { EntityType } from './EntityType'

export default abstract class Entity {
	protected readonly _entityType!: EntityType
	protected readonly _pos$!: BehaviorSubject<Position>

	public get type(): EntityType {
		return this._entityType
	}

	public get pos(): Readonly<Position> {
		return this._pos$.value
	}

	public get pos$(): Observable<Position> {
		return this._pos$.asObservable()
	}
}
