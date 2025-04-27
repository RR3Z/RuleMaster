import { EntityType } from './EntityType'
import IEntity from './IEntity'

export default abstract class Character implements IEntity {
	readonly entityType: EntityType

	constructor(entityType: EntityType) {
		this.entityType = entityType
	}
}
