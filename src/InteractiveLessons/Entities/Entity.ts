import { EntityType } from './EntityType'

export default abstract class Entity {
	protected _type!: EntityType

	public get type(): EntityType {
		return this._type
	}
}
