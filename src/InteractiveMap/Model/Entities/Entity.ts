import { EntityType } from '../../_Enums/EntityType.ts'

export default abstract class Entity {
	protected _type: EntityType

	constructor(type: EntityType) {
		this._type = type
	}

	public get type() {
		return this._type
	}
}
