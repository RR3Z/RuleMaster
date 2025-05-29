import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import GridOfCells from '@/InteractiveLessons/InteractiveMap/Logic/Grid/GridOfCells'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Observable, Subject } from 'rxjs'
import { ActionPhase } from '../ActionPhase'
import ActionsManager from '../ActionsManager'
import { IPhasedAction } from '../IPhasedAction'
import DNDDashAction from './Actions/DNDDashAction'
import DNDDodgeAction from './Actions/DNDDodgeAction'
import DNDMeleeAttackAction, {
	MeleeAttackActionPerformedEvent,
} from './Actions/DNDMeleeAttackAction'
import DNDMoveAction, {
	MoveActionPerformedEvent,
} from './Actions/DNDMoveAction'
import DNDRangedAttackAction, {
	RangedAttackActionPerformedEvent,
} from './Actions/DNDRangedAttackAction'
import DNDSpellAttackAction, {
	SpellAttackActionPerformedEvent,
} from './Actions/DNDSpellAttackAction'

export default class DNDActionsManager extends ActionsManager {
	private _currentActionActor!: DNDCharacter
	private _current!: IPhasedAction | undefined
	private _move: DNDMoveAction
	private _meleeAttack: DNDMeleeAttackAction
	private _rangedAttack: DNDRangedAttackAction
	private _dashAction: DNDDashAction
	private _dodgeAction: DNDDodgeAction
	private _spellAttack: DNDSpellAttackAction

	private readonly _onPerformError$: Subject<string>

	constructor(pathFinder: CellsAStarPathFinder, gridOfCells: GridOfCells) {
		super()
		this._move = new DNDMoveAction(pathFinder)
		this._meleeAttack = new DNDMeleeAttackAction(gridOfCells)
		this._rangedAttack = new DNDRangedAttackAction(pathFinder, gridOfCells)
		this._spellAttack = new DNDSpellAttackAction(gridOfCells, pathFinder)
		this._dashAction = new DNDDashAction()
		this._dodgeAction = new DNDDodgeAction()

		this._onPerformError$ = new Subject<string>()
	}

	public perform(
		actor: DNDCharacter,
		action?: IPhasedAction,
		...args: any
	): void {
		if (
			actor.stateMachine.currentState === DNDCharacterState.DEAD ||
			actor.stateMachine.currentState === DNDCharacterState.WAITING_TURN
		) {
			throw new Error(
				`DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!`
			)
		}

		if (action) {
			if (
				this._current &&
				action !== this._current &&
				this._current.currentPhase() !== ActionPhase.COMPLETED
			) {
				this._onPerformError$.next(
					'Вы пытаетесь совершить новое действие, когда еще не закончил предыдущее. Не надо так!'
				)
				return
			}

			action.reset()
			this._current = action
		}

		if (!this._current) {
			throw new Error(`DNDActionsManager -> perform(): No action to perform.`)
		}

		this._currentActionActor = actor
		try {
			this._current.enterPhaseInput(actor, ...args)
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes('End Cell is not empty!')) {
					this._onPerformError$.next(
						'Попытка переместиться в занятую клетку (другим персонажем или это граница карты).'
					)
				}
			}
		}
	}

	public get onPerformError$(): Observable<string> {
		return this._onPerformError$.asObservable()
	}

	public get actor(): DNDCharacter {
		return this._currentActionActor
	}

	public get current(): IPhasedAction | undefined {
		return this._current
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

	public get dodgeAction(): DNDDodgeAction {
		return this._dodgeAction
	}

	public get spellAttackAction(): DNDSpellAttackAction {
		return this._spellAttack
	}

	public get onMoveActionPerformed(): Observable<MoveActionPerformedEvent> {
		return this._move.onMoveActionPerformed$
	}

	public get onPositionChange(): Observable<DNDCharacter> {
		return this._move.onPositionChange$
	}

	public get onMeleeAttackActionPerformed(): Observable<MeleeAttackActionPerformedEvent> {
		return this._meleeAttack.onActionPerformed$
	}

	public get onRangedAttackActionPerformed(): Observable<RangedAttackActionPerformedEvent> {
		return this._rangedAttack.onActionPerformed$
	}

	public get onSpellAttackActionPerformed(): Observable<SpellAttackActionPerformedEvent> {
		return this._spellAttack.onActionPerformed$
	}

	public resetCurrentAction(): void {
		this._current?.reset()
		this._current = undefined
	}
}
