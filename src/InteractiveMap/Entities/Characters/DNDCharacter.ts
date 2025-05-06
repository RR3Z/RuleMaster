import { CharacterLogicData } from '../../_Types/CharacterLogicData'
import { DNDCharacterData } from '../../_Types/DNDCharacterData'
import EquipmentManager from '../../EquipmentManager/EquipmentManager'
import { EntityType } from '../EntityType'
import Character from './Character'

export default class DNDCharacter extends Character {
	private _maxMovementDistance: number
	private _movementDistance: number
	private _equipment: EquipmentManager

	constructor(entityType: EntityType, data: CharacterLogicData) {
		super(entityType, data.pos)

		// General
		this._name = data.name

		// Specific
		const dndCharacterData = data.data as DNDCharacterData

		this._maxHealth = dndCharacterData.maxHealth
		this._health = this._maxHealth
		this._maxMovementDistance = dndCharacterData.maxMovementDistance
		this._movementDistance = this._maxMovementDistance
		this._equipment = new EquipmentManager(dndCharacterData.items)
	}

	public get maxMovementDistance(): number {
		return this._maxMovementDistance
	}

	public get movementDistance(): number {
		return this._movementDistance
	}

	public get equipmentManager(): EquipmentManager {
		return this._equipment
	}
}
