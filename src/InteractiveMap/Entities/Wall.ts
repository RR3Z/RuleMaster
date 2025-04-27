import { EntityType } from './EntityType'
import IEntity from './IEntity'

export default class Wall implements IEntity {
	readonly entityType: EntityType

	constructor() {
		this.entityType = EntityType.WALL
	}
}
