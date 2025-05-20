import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import Cell from '@/InteractiveLessons/InteractiveMap/Logic/Grid/Cell'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDRollType } from '@/InteractiveLessons/Spells/DND/DNDRollType'
import { DNDSpellData } from '@/InteractiveLessons/Spells/DND/DNDSpellData'
import { DNDSpellForm } from '@/InteractiveLessons/Spells/DND/DNDSpellForm'
import { DNDSpellType } from '@/InteractiveLessons/Spells/DND/DNDSpellType'
import { HitType } from '@/InteractiveLessons/Types/HitType'
import { Position } from '@/InteractiveLessons/Types/Position'
import { Observable, Subject } from 'rxjs'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDSpellAttackAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _targets: [Readonly<DNDCharacter>, HitType | null][]
	private _spell: DNDSpellData | null

	// Dependencies
	private _gridOfCells: GridOfCells
	private _pathFinder: CellsAStarPathFinder

	// Events
	private readonly _onActionPerform$: Subject<DNDSpellData>

	constructor(gridOfCells: GridOfCells, pathFinder: CellsAStarPathFinder) {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []
		this._spell = null

		this._gridOfCells = gridOfCells
		this._pathFinder = pathFinder

		this._onActionPerform$ = new Subject<DNDSpellData>()
	}

	public get onActionPerformed$(): Observable<DNDSpellData> {
		return this._onActionPerform$.asObservable()
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	public enterPhaseInput(
		actor: DNDCharacter,
		spell?: DNDSpellData,
		attackPosition?: Position,
		hitRolls?: number[],
		savingThrows?: number[],
		damageRolls?: number[]
	): void {
		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				if (spell === undefined) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: spell is undefined!'
					)
				}

				if (spell.type !== DNDSpellType.ATTACK) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: spell have wrong type!'
					)
				}

				if (attackPosition === undefined) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: attackArea is undefined!'
					)
				}

				this._spell = spell
				this.rangeCheck(actor, attackPosition)
				this._onActionPerform$.next(spell)
				break
			case ActionPhase.HIT_CHECK:
				if (hitRolls === undefined) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> HIT_CHECK: hitRolls are undefined!'
					)
				}

				if (this._targets.length !== hitRolls.length) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> HIT_CHECK:  number of Hit Rolls does not match the number of Targets!'
					)
				}

				this.hitCheck(actor, hitRolls)
				break
			case ActionPhase.SAVING_THROW_CHECK:
				if (savingThrows === undefined) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> SAVING_THROW_CHECK: savingThrows are undefined!'
					)
				}

				if (!this._spell!.savingThrowStat) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> SAVING_THROW_CHECK: Spell with Saving Throw but stat (in spell) is not defined!'
					)
				}

				if (this._targets.length !== savingThrows.length) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> SAVING_THROW_CHECK:  number of Saving Throw Rolls does not match the number of Targets!'
					)
				}

				this.savingThrowCheck(actor, savingThrows)
				break
			case ActionPhase.APPLY_DAMAGE:
				if (damageRolls === undefined) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: damageRolls are undefined!'
					)
				}

				if (this._targets.length !== damageRolls.length) {
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> APPLY_DAMAGE:  number of Damage Rolls does not match the number of Targets!'
					)
				}

				this.applyDamage(damageRolls)
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					'DNDSpellAttackAction -> enterPhaseInput(): Unknown phase!'
				)
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._targets = []
		this._spell = null
	}

	private rangeCheck(actor: DNDCharacter, attackPosition: Position): void {
		const attackArea = this.getSpellArea(
			attackPosition,
			this._spell!.form,
			this._spell!.radius
		)

		this._pathFinder.maxPathCost = this._spell!.maxDistance
		this._pathFinder.needChecksForCellsContent = false
		this._pathFinder.isStepCostConstant = true
		const pathFinderResults = this._pathFinder.shortestPath(
			actor.pos,
			attackPosition
		)

		if (
			pathFinderResults.path.length > this._spell!.maxDistance / 5 ||
			this._gridOfCells.cell(attackPosition) !==
				pathFinderResults.path[pathFinderResults.path.length - 1]
		) {
			throw new Error(
				"DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't use spell outside of the Spell Range!"
			)
		}

		for (const cell of attackArea) {
			if (
				cell.contentType === EntityType.ENEMY ||
				cell.contentType === EntityType.PLAYER
			) {
				this._targets.push([cell.content as DNDCharacter, null])
			}
		}

		if (this._targets.length === 0) {
			this._currentPhase = ActionPhase.COMPLETED
			return
		}

		switch (this._spell!.rollType) {
			case DNDRollType.ACTOR_ATTACK:
				this._currentPhase = ActionPhase.HIT_CHECK
				break
			case DNDRollType.TARGET_SAVING_THROW:
				this._currentPhase = ActionPhase.SAVING_THROW_CHECK
				break
			default:
				throw new Error(
					'DNDSpellAttackAction -> rangeCheck(): Unknown Roll Type!'
				)
		}
	}

	private hitCheck(actor: DNDCharacter, hitRolls: number[]): void {
		const newTargets: [Readonly<DNDCharacter>, HitType][] = []

		for (let i = 0; i < this._targets.length; i++) {
			// Crtitical Miss
			if (hitRolls[i] <= 1) continue

			// Critical Hit
			if (hitRolls[i] >= 20) {
				newTargets.push([this._targets[i][0], HitType.CRITICAL])
			}

			// Check Hit
			else {
				let hitValue = hitRolls[i] + actor.spellAttackModifier

				if (hitValue >= this._targets[i][0].armourClass) {
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

	private savingThrowCheck(actor: DNDCharacter, savingThrows: number[]): void {
		const newTargets: [Readonly<DNDCharacter>, HitType][] = []
		const dcValue = actor.savingThrowDifficulty

		for (let i = 0; i < this._targets.length; i++) {
			// Critical Failure
			if (savingThrows[i] <= 1)
				newTargets.push([this._targets[i][0], HitType.DEFAULT])

			// Check DC
			let savingThrowValue =
				savingThrows[i] +
				this._targets[i][0].savingThrowModifier(this._spell!.savingThrowStat!)

			if (savingThrowValue < dcValue) {
				newTargets.push([this._targets[i][0], HitType.DEFAULT])
			} else {
				newTargets.push([this._targets[i][0], HitType.HALF_DAMAGE])
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
				case HitType.HALF_DAMAGE:
					this._targets[i][0].takeDamage(Math.floor(damageRolls[i] / 2))
					break
				case null:
				default:
					throw new Error(
						'DNDSpellAttackAction -> enterPhaseInput() -> APPLY_DAMAGE: Unknown Hit Type!'
					)
			}
		}

		this._currentPhase = ActionPhase.COMPLETED
	}

	private getSpellArea(
		centerPos: Position,
		form: DNDSpellForm,
		radius: number
	): Cell[] {
		const radiusInCells = radius / 5

		const cells: Cell[] = []
		const checkedPositions = new Set<Position>()

		const addCellIfValid = (pos: Position) => {
			if (!this._gridOfCells.isCellExists(pos)) return

			if (checkedPositions.has(pos)) return
			checkedPositions.add(pos)

			cells.push(this._gridOfCells.cell(pos))
		}

		switch (form) {
			case DNDSpellForm.CELL:
				addCellIfValid(centerPos)
				break
			case DNDSpellForm.CIRCLE:
				for (let dx = -radiusInCells; dx <= radiusInCells; dx++) {
					for (let dy = -radiusInCells; dy <= radiusInCells; dy++) {
						if (dx * dx + dy * dy <= radiusInCells * radiusInCells) {
							addCellIfValid({
								x: centerPos.x + dx,
								y: centerPos.y + dy,
							})
						}
					}
				}
				break
			case DNDSpellForm.RECTANGLE:
				for (let dx = -radiusInCells; dx <= radiusInCells; dx++) {
					for (let dy = -radiusInCells; dy <= radiusInCells; dy++) {
						addCellIfValid({
							x: centerPos.x + dx,
							y: centerPos.y + dy,
						})
					}
				}
				break
			default:
				throw new Error(
					`DNDSpellAttackAction -> getSpellArea(): Unknown spell form: ${form}`
				)
		}

		return cells
	}
}
