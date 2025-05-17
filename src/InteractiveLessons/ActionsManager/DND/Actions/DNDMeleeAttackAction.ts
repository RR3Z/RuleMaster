import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { HitType } from '@/InteractiveLessons/Types/HitType'
import { Position } from '@/InteractiveLessons/Types/Position'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDMeleeAttackAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _targets: [Readonly<DNDCharacter>, HitType | null][]

	// Dependencies
	private _gridOfCells: GridOfCells

	constructor(gridOfCells: GridOfCells) {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []

		this._gridOfCells = gridOfCells
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	public enterPhaseInput(
		actor: DNDCharacter,
		attackArea?: Position[],
		hitRolls?: number[],
		damageRolls?: number[]
	): void {
		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				const weapon = actor.equipmentManager.slotItem(
					DNDEquipmentSlotType.MAIN_HAND
				)
				if (
					weapon &&
					(weapon as DNDWeaponData).rangeType !== DNDWeaponRangeType.MELEE
				) {
					throw new Error(
						"DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't attack without Melee Weapon!"
					)
				}

				if (attackArea === undefined) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: attackArea is undefined!'
					)
				}

				this.rangeCheck(actor, attackArea)
				break
			case ActionPhase.HIT_CHECK:
				if (hitRolls === undefined) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> HIT_CHECK: hitRolls are undefined!'
					)
				}

				if (this._targets.length !== hitRolls.length) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> HIT_CHECK:  number of Hit Rolls does not match the number of Targets!'
					)
				}

				this.hitCheck(actor, hitRolls)
				break
			case ActionPhase.APPLY_DAMAGE:
				if (damageRolls === undefined) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: damageRolls are undefined!'
					)
				}

				if (this._targets.length !== damageRolls.length) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> APPLY_DAMAGE:  number of Damage Rolls does not match the number of Targets!'
					)
				}

				this.applyDamage(damageRolls)
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					'DNDMeleeAttackAction -> enterPhaseInput(): Unknown phase!'
				)
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []
	}

	private rangeCheck(actor: DNDCharacter, attackArea: Position[]): void {
		attackArea.forEach((pos: Position) => {
			const cell = this._gridOfCells.cell(pos)

			// Looking to see if there's a Character in the Cell
			if (
				cell.contentType === EntityType.ENEMY ||
				cell.contentType === EntityType.PLAYER
			) {
				const attackRange = actor.maxWeaponRange

				// Checking to see if Attack reaches this Character
				if (
					Math.abs(actor.pos.x - cell.pos.x) - attackRange > 0 &&
					Math.abs(actor.pos.y - cell.pos.y) - attackRange > 0
				) {
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: Wrong attack area!'
					)
				}

				this._targets.push([cell.content as DNDCharacter, null])
			}
		})

		if (this._targets.length === 0) this._currentPhase = ActionPhase.COMPLETED
		else this._currentPhase = ActionPhase.HIT_CHECK
	}

	private hitCheck(actor: DNDCharacter, hitRolls: number[]): void {
		const newTargets: [Readonly<DNDCharacter>, HitType][] = []

		for (let i = 0; i < this._targets.length; i++) {
			// Crtitical Miss
			if (hitRolls[i] === 1) continue

			// Critical Hit
			if (hitRolls[i] >= 20) {
				newTargets.push([this._targets[i][0], HitType.CRITICAL])
			}

			// Check Hit
			else {
				const weapon = actor.equipmentManager.slotItem(
					DNDEquipmentSlotType.MAIN_HAND
				)

				let hitValue
				if (weapon) {
					hitValue =
						hitRolls[i] +
						actor.statsManager.attackModifier(
							(weapon as DNDWeaponData).rangeType,
							(weapon as DNDWeaponData).descriptors
						)
				} else {
					hitValue =
						hitRolls[i] + actor.statsManager.statModifier(DNDStatType.STRENGTH)
				}

				if (hitValue >= (this._targets[i][0] as DNDCharacter).armourClass) {
					newTargets.push([this._targets[i][0], HitType.DEFAULT])
				}
			}
		}

		if (newTargets.length === 0) this._currentPhase = ActionPhase.COMPLETED
		else {
			this._targets = newTargets
			this._currentPhase = ActionPhase.APPLY_DAMAGE
		}
	}

	private applyDamage(damageRolls: number[]): void {
		for (let i = 0; i < this._targets.length; i++) {
			const hitType = this._targets[i][1]

			switch (hitType) {
				case HitType.DEFAULT:
					this._targets[i][0].takeDamage(damageRolls[i])
					break
				case HitType.CRITICAL:
					this._targets[i][0].takeDamage(damageRolls[i] * 2)
					break
				case null:
				default:
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: Unknown Hit Type!'
					)
			}
		}

		this._currentPhase = ActionPhase.COMPLETED
	}
}
