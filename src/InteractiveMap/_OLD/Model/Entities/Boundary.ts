import { EntityType } from '../../_Enums/EntityType'
import { Position } from '../../_Types/Map.ts'
import Entity from './Entity.ts'

export default class Boundary extends Entity {
	constructor(pos: Position) {
		super(EntityType.BOUNDARY, pos)
	}
}
