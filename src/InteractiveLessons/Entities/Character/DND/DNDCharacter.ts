import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDEquipmentManager from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentManager'
import DNDStatsManager from '@/InteractiveLessons/StatsManager/DNDStatsManager'
import { Position } from '@/InteractiveLessons/Types/Position'
import { BehaviorSubject } from 'rxjs'
import { EntityType } from '../../EntityType'
import Character from '../Character'
import { DNDCharacterData } from './DNDCharacterData'

export default class DNDCharacter extends Character {
	// Managers
	private _statsManager: DNDStatsManager

	// Fields
	private _data: Readonly<DNDCharacterData>
	private _currentMovementSpeed: number
	private _spellSlots: Map<number, number>

	constructor(type: EntityType, data: DNDCharacterData, startPos: Position) {
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
		this._actionsManager = new DNDActionsManager()
		this._pos$ = new BehaviorSubject<Position>(startPos)
	}

	public get statsManager(): DNDStatsManager {
		return this._statsManager
	}
}
