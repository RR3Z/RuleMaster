import DNDEffectsManager from '@/InteractiveLessons/EffectsManager/DND/DNDEffectsManager'
import { DNDEffectType } from '@/InteractiveLessons/EffectsManager/DND/DNDEffectType'
import { DNDArmourData } from '@/InteractiveLessons/EquipmentManager/DND/Armour/DNDArmourData'
import DNDEquipmentManager from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentManager'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponDescriptor } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponDescriptor'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import { DNDSpellData } from '@/InteractiveLessons/Spells/DND/DNDSpellData'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import DNDCharacterStateMachine from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterStateMachine'
import DNDStatsManager from '@/InteractiveLessons/StatsManager/DNDStatsManager'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { Position } from '@/InteractiveLessons/Types/Position'
import { BehaviorSubject } from 'rxjs'
import { EntityType } from '../../EntityType'
import Character from '../Character'
import { DNDCharacterData } from './DNDCharacterData'
import { DNDClass } from './DNDClass'

export default class DNDCharacter extends Character {
	// Managers
	private _stateMachine: DNDCharacterStateMachine
	private _statsManager: DNDStatsManager
	private _effectsManager: DNDEffectsManager

	// Fields
	private _data: Readonly<DNDCharacterData>
	private _maxMovementSpeed: number
	private _currentMovementSpeed: number
	private _spellSlots: Map<number, number>

	constructor(
		type: EntityType,
		data: DNDCharacterData,
		startPos: Position,
		startState: DNDCharacterState
	) {
		super()

		// Fields
		this._type = type
		this._data = data
		this._name = this._data.name
		this._currentHealth = data.maxHealth
		this._maxMovementSpeed = data.maxMovementSpeed
		this._currentMovementSpeed = data.maxMovementSpeed
		this._spellSlots = new Map(data.maxSpellSlots)
		this._pos$ = new BehaviorSubject<Position>(startPos)

		// Managers
		this._stateMachine = new DNDCharacterStateMachine(startState)
		this._statsManager = new DNDStatsManager(
			new Map(data.stats),
			new Set(data.savingThrowProficiencies)
		)
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

	public override takeDamage(value: number): void {
		this._currentHealth -= value

		if (this._currentHealth <= 0) {
			this._currentHealth = 0
			this._stateMachine.changeState(DNDCharacterState.DEAD)
		}
	}

	public get currentMovementSpeed(): number {
		return this._currentMovementSpeed
	}

	public get armourClass(): number {
		const armour = this._equipmentManager.slotItem(DNDEquipmentSlotType.ARMOUR)

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

	public get bonusMastery(): number {
		switch (this._data.level) {
			case 1:
			case 2:
			case 3:
			case 4:
				return 2
			case 5:
			case 6:
			case 7:
			case 8:
				return 3
			case 9:
			case 10:
			case 11:
			case 12:
				return 4
			case 13:
			case 14:
			case 15:
			case 16:
				return 5
			case 17:
			case 18:
			case 19:
			case 20:
				return 6
		}

		return 0
	}

	public get attackModifier(): number {
		const weapon = this.equipmentManager.slotItem(
			DNDEquipmentSlotType.MAIN_HAND
		)

		if (weapon === null)
			return this._statsManager.statModifier(DNDStatType.STRENGTH)

		if (
			(weapon as DNDWeaponData).rangeType === DNDWeaponRangeType.MELEE &&
			!(weapon as DNDWeaponData).descriptors.includes(
				DNDWeaponDescriptor.FINESSE
			)
		) {
			return this._statsManager.statModifier(DNDStatType.STRENGTH)
		} else {
			return this._statsManager.statModifier(DNDStatType.DEXTERITY)
		}
	}

	public get spellAttackModifier(): number {
		switch (this._data.class) {
			case DNDClass.ARTIFICER:
			case DNDClass.WIZARD:
				return this._statsManager.statModifier(DNDStatType.INTELLIGENCE)
			case DNDClass.CLERIC:
			case DNDClass.DRUID:
			case DNDClass.RANGER:
				return this._statsManager.statModifier(DNDStatType.WISDOM)
			case DNDClass.BARD:
			case DNDClass.PALADIN:
			case DNDClass.SORCERER:
			case DNDClass.WARLOCK:
				return this._statsManager.statModifier(DNDStatType.CHARISMA)
			default:
				throw new Error('DNDCharacter -> spellAttackModifier(): Unknown class!')
		}
	}

	public get initiativeModifier(): number {
		return this._statsManager.statModifier(DNDStatType.DEXTERITY)
	}

	public get savingThrowDifficulty(): number {
		return 8 + this.spellAttackModifier
	}

	public savingThrowModifier(stat: DNDStatType): number {
		if (this._statsManager.haveSavingThrowProficiency(stat))
			return this._statsManager.statModifier(stat) + this.bonusMastery

		return this._statsManager.statModifier(stat)
	}

	public override get equipmentManager(): DNDEquipmentManager {
		return this._equipmentManager as DNDEquipmentManager
	}

	public get effectsManager(): DNDEffectsManager {
		return this._effectsManager
	}

	public get stateMachine(): DNDCharacterStateMachine {
		return this._stateMachine
	}

	public get statsManager(): DNDStatsManager {
		return this._statsManager
	}

	public get spells(): DNDSpellData[] {
		return Array.from(this._data.spells)
	}

	public get clazz(): DNDClass {
		return this._data.class
	}

	public get level(): number {
		return this._data.level
	}

	public get maxMovementSpeed(): number {
		return this._maxMovementSpeed
	}

	public get spellSlots(): Map<number, number> {
		return this._spellSlots
	}

	public onNewTurn(): void {
		this._effectsManager.updateTurn()

		this._currentMovementSpeed = this._maxMovementSpeed
	}

	public updateMovementSpeed(spent: number): void {
		if (this._currentMovementSpeed - spent < 0) {
			throw new Error(
				`DNDCharacter '${this.name}' -> updateMovementSpeed(): CurrentMovementSpeed of this Character is < 0`
			)
		}

		this._currentMovementSpeed -= spent
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
