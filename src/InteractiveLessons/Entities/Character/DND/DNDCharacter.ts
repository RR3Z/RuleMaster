import DNDEquipmentManager from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentManager'
import DNDStatsManager from '@/InteractiveLessons/StatsManager/DNDStatsManager'
import { EntityType } from '../../EntityType'
import Character from '../Character'
import { DNDCharacterData } from './DNDCharacterData'

export default class DNDCharacter extends Character {
	// Managers
	private _statsManager: DNDStatsManager
	private _equipmentManager: DNDEquipmentManager

	// Fields
	private _data: Readonly<DNDCharacterData>
	private _currentMovementSpeed: number
	private _spellSlots: Map<number, number>

	constructor(type: EntityType, data: DNDCharacterData) {
		super()

		// Fields
		this._type = type
		this._data = data
		this._currentHealth = data.maxHealth
		this._currentMovementSpeed = data.maxMovementSpeed
		this._spellSlots = data.maxSpellSlots

		// Managers
		this._statsManager = new DNDStatsManager(data.stats, data.proficiencies)
		this._equipmentManager = new DNDEquipmentManager(data.equipment)
	}
}
