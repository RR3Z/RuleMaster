import Character from '@/InteractiveLessons/Entities/Character/Character'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { ActionPhase } from '../ActionPhase'
import ActionsManager from '../ActionsManager'
import { IPhasedAction } from '../IPhasedAction'
import DNDDashAction from './Actions/DNDDashAction'
import DNDMeleeAttackAction from './Actions/DNDMeleeAttackAction'
import DNDMoveAction from './Actions/DNDMoveAction'
import DNDRangedAttackAction from './Actions/DNDRangedAttackAction'

export default class DNDActionsManager extends ActionsManager {
	private _current!: IPhasedAction
	private _move: DNDMoveAction
	private _meleeAttack: DNDMeleeAttackAction
	private _rangedAttack: DNDRangedAttackAction
	private _dashAction: DNDDashAction
	// TODO: private _spellCast: DNDSpellCastAction
	// TODO: private _dodgeAction: DNDDodgeAction

	constructor(pathFinder: CellsAStarPathFinder, gridOfCells: GridOfCells) {
		super()
		this._move = new DNDMoveAction(pathFinder)
		this._meleeAttack = new DNDMeleeAttackAction(gridOfCells)
		this._rangedAttack = new DNDRangedAttackAction(pathFinder, gridOfCells)
		this._dashAction = new DNDDashAction()
	}

	public perform(actor: Character, action?: IPhasedAction, ...args: any): void {
		if (action) {
			if (
				this._current &&
				this._current.currentPhase() !== ActionPhase.COMPLETED
			) {
				throw new Error(
					`DNDActionsManager -> perform(): Can't perform a new action while the current one is not completed!`
				)
			}

			this._current.reset()
			this._current = action
		}

		if (!this._current) {
			throw new Error(`DNDActionsManager -> perform(): No action to perform.`)
		}

		this._current.enterPhaseInput(actor, ...args)
	}

	public get moveAction(): DNDMoveAction {
		return this._move
	}

	public get meleeAttackAction(): DNDMeleeAttackAction {
		return this._meleeAttack
	}

	public get rangedAttackAction(): DNDRangedAttackAction {
		return this._rangedAttack
	}

	public get dashAction(): DNDDashAction {
		return this._dashAction
	}
}
