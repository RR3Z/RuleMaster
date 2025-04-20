import { BehaviorSubject } from 'rxjs'
import { EntityType } from '../../_Enums/EntityType.ts'
import { Position } from '../../_Types/Map.ts'

export default abstract class Entity {
	protected _type: EntityType

	// Reactive Properties
	public readonly position!: BehaviorSubject<Position>

	constructor(type: EntityType, pos: Position) {
		this._type = type
		this.position = new BehaviorSubject(pos)
	}

	public get type() {
		return this._type
	}
}
