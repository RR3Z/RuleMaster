import { EntityType } from '../../_Enums/EntityType'
import Entity from './Entity.ts'

export default class Boundary extends Entity {
	constructor() {
		super(EntityType.BOUNDARY)
	}
}
