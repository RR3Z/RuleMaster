import { ActionPhase } from '../../../_Types/ActionPhase'
import { HitType } from '../../../_Types/HitType'
import { Position } from '../../../_Types/Position'
import { SlotType } from '../../../_Types/SlotType'
import { WeaponData } from '../../../_Types/WeaponData'
import Character from '../../../Entities/Characters/Character'
import DNDCharacter from '../../../Entities/Characters/DNDCharacter'
import { EntityType } from '../../../Entities/EntityType'
import GridOfCells from '../../../Grid/GridOfCells'
import IPhasedAction from '../IPhasedAction'

export default class DNDMeleeAttackAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	// private _targets: Readonly<Character>[]
	private _targets: [Readonly<Character>, HitType][]

	// Dependecies
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
		actor: Character,
		attackArea?: Position[],
		hitRolls?: number[],
		damageRolls?: number[]
	): void {
		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				if (attackArea === undefined)
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: newPos is undefined!'
					)

				this.rangeCheck(actor, attackArea)
				break
			case ActionPhase.HIT_CHECK:
				if (hitRolls === undefined)
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> HIT_CHECK: hitRolls are undefined!'
					)

				if (this._targets.length !== hitRolls.length)
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> HIT_CHECK:  number of Hit Rolls does not match the number of Targets!'
					)

				this.hitCheck(actor, hitRolls)
				break
			case ActionPhase.APPLY_DAMAGE:
				if (damageRolls === undefined)
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: damageRolls are undefined!'
					)

				this.applyDamage(damageRolls)
				break
			case ActionPhase.COMPLETE:
				// Nothing to do here
				break
			default:
				throw new Error('MoveAction -> enterPhaseInput(): Invalid Phase')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []
	}

	private rangeCheck(actor: Character, attackArea: Position[]): void {
		attackArea.forEach((pos: Position) => {
			const cell = this._gridOfCells.cell(pos)

			// Смотрю, есть ли в клетке персонаж
			if (
				cell.contentType === EntityType.ENEMY ||
				cell.contentType === EntityType.PLAYER
			) {
				const attackRange =
					(
						(actor as DNDCharacter).equipmentManager.getItemData(
							SlotType.MAIN_HAND
						) as WeaponData
					).attackRange / 5

				// Проверяю, дотягивается ли моя атака до этого персонажа
				if (
					Math.abs(actor.pos.x - cell.pos.x) - attackRange > 0 &&
					Math.abs(actor.pos.y - cell.pos.y) - attackRange > 0
				)
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: Wrong attack area!'
					)

				this._targets.push([cell.content as DNDCharacter, HitType.UNDEFINED])
			}
		})

		if (this._targets.length === 0) this._currentPhase = ActionPhase.COMPLETE
		else this._currentPhase = ActionPhase.HIT_CHECK
	}

	private hitCheck(actor: Character, hitRolls: number[]): void {
		const dndActor = actor as DNDCharacter

		const newTargets: [Readonly<Character>, HitType][] = []
		for (let i = 0; i < this._targets.length; i++) {
			if (hitRolls[i] === 1) continue
			if (hitRolls[i] === 20) {
				newTargets.push([this._targets[i][0], HitType.CRITICAL])
			} else {
				const hitValue =
					hitRolls[i] +
					dndActor.statsStorage.attackModifier(
						(
							dndActor.equipmentManager.getItemData(
								SlotType.MAIN_HAND
							) as WeaponData
						).descriptors
					)

				if (hitValue >= (this._targets[i][0] as DNDCharacter).defenceClass)
					newTargets.push([this._targets[i][0], HitType.SIMPLE])
			}
		}

		if (newTargets.length === 0) this._currentPhase = ActionPhase.COMPLETE
		else {
			this._targets = newTargets
			this._currentPhase = ActionPhase.APPLY_DAMAGE
		}
	}

	private applyDamage(damageRolls: number[]): void {
		for (let i = 0; i < this._targets.length; i++) {
			const hitType = this._targets[i][1]

			switch (hitType) {
				case HitType.SIMPLE:
					;(this._targets[i][0] as DNDCharacter).takeDamage(damageRolls[i])
					break
				case HitType.CRITICAL:
					;(this._targets[i][0] as DNDCharacter).takeDamage(damageRolls[i] * 2)
					break
				case HitType.UNDEFINED:
				default:
					throw new Error(
						'DNDMeleeAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: Unknown Hit Type!'
					)
			}
		}

		this._currentPhase = ActionPhase.COMPLETE
	}
}
