import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { DNDEquipmentSlotType } from '@/InteractiveLessons/EquipmentManager/DND/DNDEquipmentSlotType'
import { DNDWeaponData } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponData'
import { DNDWeaponRangeType } from '@/InteractiveLessons/EquipmentManager/DND/Weapon/DNDWeaponRangeType'
import Cell from '@/InteractiveLessons/InteractiveMap/Logic/Grid/Cell'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { HitType } from '@/InteractiveLessons/Types/HitType'
import { Position } from '@/InteractiveLessons/Types/Position'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDRangedAttackAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _targets: [Readonly<DNDCharacter>, HitType | null][]

	// Dependencies
	private _gridOfCells: GridOfCells
	private _pathFinder: CellsAStarPathFinder

	constructor(pathFinder: CellsAStarPathFinder, gridOfCells: GridOfCells) {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []

		this._gridOfCells = gridOfCells
		this._pathFinder = pathFinder
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
					(weapon as DNDWeaponData).rangeType !== DNDWeaponRangeType.RANGE
				) {
					throw new Error(
						"DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't attack without Melee Weapon!"
					)
				}

				if (attackArea === undefined) {
					throw new Error(
						'DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: attackArea is undefined!'
					)
				}

				this.rangeCheck(actor, attackArea)
				break
			case ActionPhase.HIT_CHECK:
				if (hitRolls === undefined) {
					throw new Error(
						'DNDRangedAttackAction -> enterPhaseInput() -> HIT_CHECK: hitRolls are undefined!'
					)
				}

				if (this._targets.length !== hitRolls.length) {
					throw new Error(
						'DNDRangedAttackAction -> enterPhaseInput() -> HIT_CHECK:  number of Hit Rolls does not match the number of Targets!'
					)
				}

				this.hitCheck(actor, hitRolls)
				break
			case ActionPhase.APPLY_DAMAGE:
				if (damageRolls === undefined) {
					throw new Error(
						'DNDRangedAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: damageRolls are undefined!'
					)
				}

				if (this._targets.length !== damageRolls.length) {
					throw new Error(
						'DNDRangedAttackAction -> enterPhaseInput() -> APPLY_DAMAGE:  number of Damage Rolls does not match the number of Targets!'
					)
				}

				this.applyDamage(damageRolls)
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					'DNDRangedAttackAction -> enterPhaseInput(): Unknown phase!'
				)
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []
	}

	private rangeCheck(actor: DNDCharacter, attackArea: Position[]): void {
		for (const pos of attackArea) {
			const cell = this._gridOfCells.cell(pos)

			// Looking to see if there's a Character in the Cell
			if (
				cell.contentType === EntityType.ENEMY ||
				cell.contentType === EntityType.PLAYER
			) {
				const attackRange = actor.maxWeaponRange

				this._pathFinder.maxPathCost = attackRange
				const shortestPath = this._pathFinder.shortestPath(actor.pos, cell.pos)
				if (
					shortestPath.length > attackRange / 5 ||
					cell !== shortestPath[shortestPath.length - 1]
				) {
					throw new Error(
						"DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't attack outside of the Attack Range!"
					)
				}

				if (this.isStraightLine(shortestPath)) {
					this._targets.push([cell.content as DNDCharacter, null])
				}
			}
		}

		if (this._targets.length === 0) this._currentPhase = ActionPhase.COMPLETED
		else this._currentPhase = ActionPhase.HIT_CHECK
	}

	private hitCheck(actor: DNDCharacter, hitRolls: number[]): void {
		const newTargets: [Readonly<DNDCharacter>, HitType][] = []

		for (let i = 0; i < this._targets.length; i++) {
			const target = this._targets[i][0]

			// Crtitical Miss
			if (hitRolls[i] === 1) continue

			// Critical Hit
			if (hitRolls[i] >= 20) {
				newTargets.push([target, HitType.CRITICAL])
			}

			// Check Hit
			else {
				const hitValue = hitRolls[i] + actor.attackModifier

				if (hitValue >= target.armourClass) {
					newTargets.push([target, HitType.DEFAULT])
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

	private isStraightLine(path: Cell[]): boolean {
		if (path.length < 2) return true

		const start = path[0]
		const end = path[path.length - 1]

		// Получаем список клеток линии по алгоритму Брезенхэма
		const lineCells: Cell[] = this.bresenhamAlgorithm(start, end)

		if (lineCells.length !== path.length) return false
		for (let i = 0; i < path.length; i++) {
			if (
				path[i].pos.x !== lineCells[i].pos.x ||
				path[i].pos.y !== lineCells[i].pos.y
			)
				return false
		}

		return true
	}

	private bresenhamAlgorithm(start: Cell, end: Cell): Cell[] {
		const cells: Cell[] = []

		let x0 = start.pos.x
		let y0 = start.pos.y
		const x1 = end.pos.x
		const y1 = end.pos.y

		const dx = Math.abs(x1 - x0)
		const dy = Math.abs(y1 - y0)

		const sx = x0 < x1 ? 1 : -1
		const sy = y0 < y1 ? 1 : -1

		let err = dx - dy

		while (true) {
			cells.push(this._gridOfCells.cell({ x: x0, y: y0 }))

			if (x0 === x1 && y0 === y1) break

			const e2 = 2 * err
			if (e2 > -dy) {
				err -= dy
				x0 += sx
			}
			if (e2 < dx) {
				err += dx
				y0 += sy
			}
		}

		return cells
	}
}
