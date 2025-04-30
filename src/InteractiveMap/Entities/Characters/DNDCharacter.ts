import { CharacterLogicData } from '../../_Types/CharacterLogicData'
import { DNDCharacterData } from '../../_Types/DNDCharacterData'
import { EntityType } from '../EntityType'
import Character from './Character'

export default class DNDCharacter extends Character {
	constructor(entityType: EntityType, data: CharacterLogicData) {
		super(entityType, data.pos)

		// General
		this._name = data.name

		// Specific
		const dndCharacterData = data.data as DNDCharacterData
		this._maxHealth = dndCharacterData.maxHealth
		this._health = dndCharacterData.maxHealth
	}
}
