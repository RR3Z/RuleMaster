import { EntityType } from './EntityType.ts'

export default abstract class Entity {
	protected _type!: EntityType

	public get type(): EntityType {
		return this._type
	}
}
