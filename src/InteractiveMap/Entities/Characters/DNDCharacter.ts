import { ArmourData } from '../../_Types/ArmourData'
import { CharacterLogicData } from '../../_Types/CharacterLogicData'
import { DNDCharacterData } from '../../_Types/DNDCharacterData'
import { SlotType } from '../../_Types/SlotType'
import DNDEquipmentManager from '../../EquipmentManager/DNDEquipmentManager'
import { EntityType } from '../EntityType'
import Character from './Character'
import DNDCharacterStats from './DNDCharacterStats'

export default class DNDCharacter extends Character {
	private _maxMovementDistance: number
	private _movementDistance: number
	private _defenceClass: number
	private _stats: DNDCharacterStats

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
		this._equipment = new DNDEquipmentManager(dndCharacterData.items)
		this._stats = new DNDCharacterStats(
			new Map(dndCharacterData.stats),
			dndCharacterData.proficiency
		)
		this._defenceClass = dndCharacterData.defenceClass
	}

	public get maxMovementDistance(): number {
		return this._maxMovementDistance
	}

	public get movementDistance(): number {
		return this._movementDistance
	}

	public get defenceClass(): number {
		let selfValue = this._defenceClass
		let armourValue = 0
		if (this.equipmentManager.getItemData(SlotType.ARMOUR)) {
			armourValue = (
				this.equipmentManager.getItemData(SlotType.ARMOUR) as ArmourData
			).armourClass
		}

		return armourValue > selfValue ? armourValue : selfValue
	}

	public get equipmentManager(): DNDEquipmentManager {
		return this._equipment as DNDEquipmentManager
	}

	public get statsStorage(): DNDCharacterStats {
		return this._stats
	}

	public takeDamage(damage: number): void {
		if (this._health === 0) return

		this._health = Math.max(this._health - damage, 0)
	}
}
