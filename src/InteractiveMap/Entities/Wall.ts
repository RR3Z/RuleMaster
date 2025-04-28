import { Position } from '../_Types/Position'
import Entity from './Entity'
import { EntityType } from './EntityType'

export default class Wall extends Entity {
	constructor(pos: Position) {
		super(EntityType.WALL, pos)
	}
}
