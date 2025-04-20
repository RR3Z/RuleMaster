import { BehaviorSubject } from 'rxjs'
import { EntityType } from '../../_Enums/EntityType.ts'
import { Position } from '../../_Types/Map.ts'

export default abstract class Entity {
	protected _type: EntityType

	// Reactive Properties
	public readonly position: BehaviorSubject<Position> =
		new BehaviorSubject<Position>({ x: 0, y: 0 })

	constructor(type: EntityType) {
		this._type = type
	}

	public get type() {
		return this._type
	}
}
