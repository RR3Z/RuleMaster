import { Position } from '../Types/Position'
import Character from './Character'
import { EntityType } from './EntityType'

export default class Player extends Character {
	constructor(pos: Position) {
		super(EntityType.PLAYER, pos)
	}
}
