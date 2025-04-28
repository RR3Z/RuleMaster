import { Position } from '../_Types/Position'
import Character from './Character'
import { EntityType } from './EntityType'

export default class Enemy extends Character {
	constructor(pos: Position) {
		super(EntityType.ENEMY, pos)
	}
}
