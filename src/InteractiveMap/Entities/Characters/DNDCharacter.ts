import { CharacterLogicData } from '../../_Types/CharacterLogicData'
import { DNDCharacterData } from '../../_Types/DNDCharacterData'
import { EntityType } from '../EntityType'
import Character from './Character'

export default class DNDCharacter extends Character {
	protected _maxMovementDistance: number
	protected _movementDistance: number

	constructor(entityType: EntityType, data: CharacterLogicData) {
		super(entityType, data.pos)

		// General
		this._name = data.name

		// Specific
		const dndCharacterData = data.data as DNDCharacterData
		this._maxHealth = dndCharacterData.maxHealth
		this._health = dndCharacterData.maxHealth
		this._maxMovementDistance = 30
		this._movementDistance = this._maxMovementDistance
	}

	public get maxMovementDistance(): number {
		return this._maxMovementDistance
	}

	public get movementDistance(): number {
		return this._movementDistance
	}
}
