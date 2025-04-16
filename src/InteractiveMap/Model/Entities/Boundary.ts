import Entity, { EntityType } from './Entity.ts'

export default class Boundary extends Entity {
	constructor() {
		super(EntityType.BOUNDARY)
	}
}
