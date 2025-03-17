import Entity from './Entity.ts'
import { EntityType } from './EntityType.ts'

export default class Boundary extends Entity {
	constructor() {
		super()

		this._type = EntityType.BOUNDARY
	}
}
