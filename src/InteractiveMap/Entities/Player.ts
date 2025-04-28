import { DNDCharacterData } from '../_Types/DNDCharacterData'
import Character from './Character'
import { EntityType } from './EntityType'

export default class Player extends Character {
	constructor(data: DNDCharacterData) {
		super(EntityType.PLAYER, data)
	}
}
