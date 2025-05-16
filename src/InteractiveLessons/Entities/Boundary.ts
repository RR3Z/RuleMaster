import Entity from './Entity'
import { EntityType } from './EntityType'

export default class Boundary extends Entity {
	constructor() {
		super()

		this._type = EntityType.BOUNDARY
	}
}
