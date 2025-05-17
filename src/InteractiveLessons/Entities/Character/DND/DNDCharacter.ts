import DNDEffectsManager from '@/InteractiveLessons/EffectsManager/DND/DNDEffectsManager'
import { DNDEffectType } from '@/InteractiveLessons/EffectsManager/DND/DNDEffectType'
import { DNDArmourData } from '@/InteractiveLessons/EquipmentManager/DND/Armour/DNDArmourData'
import DNDEquipmentManager from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentManager'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import DNDStatsManager from '@/InteractiveLessons/StatsManager/DNDStatsManager'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { Position } from '@/InteractiveLessons/Types/Position'
import { BehaviorSubject } from 'rxjs'
import { EntityType } from '../../EntityType'
import Character from '../Character'
import { DNDCharacterData } from './DNDCharacterData'

export default class DNDCharacter extends Character {
	// Managers
	private _statsManager: DNDStatsManager
	private _effectsManager: DNDEffectsManager

	// Fields
	private _data: Readonly<DNDCharacterData>
	private _maxMovementSpeed: number
	private _currentMovementSpeed: number
	private _spellSlots: Map<number, number>

	constructor(type: EntityType, data: DNDCharacterData, startPos: Position) {
		super()

		// Fields
		this._type = type
		this._data = data
		this._currentHealth = data.maxHealth
		this._maxMovementSpeed = data.maxMovementSpeed
		this._currentMovementSpeed = data.maxMovementSpeed
		this._spellSlots = data.maxSpellSlots
		this._pos$ = new BehaviorSubject<Position>(startPos)

		// Managers
		this._statsManager = new DNDStatsManager(data.stats, data.proficiencies)
		this._equipmentManager = new DNDEquipmentManager(data.equipment)
		this._effectsManager = new DNDEffectsManager()

		// Listen Effects Manager
		this._effectsManager.onNewEffect$.subscribe((effect: DNDEffectType) =>
			this.onNewEffect(effect)
		)
		this._effectsManager.onRemoveEffect$.subscribe((effect: DNDEffectType) =>
			this.onRemoveEffect(effect)
		)
	}

	public get name(): string {
		return this._data.name
	}

	public get currentMovementSpeed(): number {
		return this._currentMovementSpeed
	}

	public get armourClass(): number {
		const armour = (this._equipmentManager as DNDEquipmentManager).slotItem(
			DNDEquipmentSlotType.ARMOUR
		)
		if (armour === null)
			return 10 + this._statsManager.statModifier(DNDStatType.DEXTERITY)
		else return (armour as DNDArmourData).armourClass
	}

	public get maxWeaponRange(): number {
		const weapon = this._equipmentManager.slotItem(
			DNDEquipmentSlotType.MAIN_HAND
		)

		if (weapon === null) return 5
		else return (weapon as DNDWeaponData).maxRange
	}

	public get statsManager(): DNDStatsManager {
		return this._statsManager
	}

	public override get equipmentManager(): DNDEquipmentManager {
		return this._equipmentManager as DNDEquipmentManager
	}

	public get effectsManager(): DNDEffectsManager {
		return this._effectsManager
	}

	private onNewEffect(effect: DNDEffectType): void {
		switch (effect) {
			case DNDEffectType.DASH:
				this._maxMovementSpeed = this._data.maxMovementSpeed * 2
				this._currentMovementSpeed += this._data.maxMovementSpeed
				break
			case DNDEffectType.DODGE:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					`DNDCharacter \"${this.name}\" -> onNewEffect(): Unknown effect \"${effect}\"!`
				)
		}
	}

	private onRemoveEffect(effect: DNDEffectType): void {
		switch (effect) {
			case DNDEffectType.DASH:
				this._maxMovementSpeed = this._data.maxMovementSpeed
				this._currentMovementSpeed -= this._data.maxMovementSpeed
				break
			case DNDEffectType.DODGE:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					`DNDCharacter \"${this.name}\" -> onRemoveEffect(): Unknown effect \"${effect}\"!`
				)
		}
	}
}
