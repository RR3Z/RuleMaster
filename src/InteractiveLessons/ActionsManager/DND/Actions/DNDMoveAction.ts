import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import Cell from '@/InteractiveLessons/InteractiveMap/Logic/Grid/Cell'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'
import { Observable, Subject } from 'rxjs'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export type MoveActionPerformedEvent = {
	actor: DNDCharacter
	newPos: Position
}

export default class DNDMoveAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _path: Cell[]

	// Dependencies
	private _pathFinder: CellsAStarPathFinder

	// Events
	private _onMoveActionPerformed$: Subject<MoveActionPerformedEvent>
	private _onPositionChange$: Subject<DNDCharacter>

	constructor(pathFinder: CellsAStarPathFinder) {
		this._currentPhase = ActionPhase.MOVEMENT_SPEED_CHECK
		this._path = []

		this._pathFinder = pathFinder

		this._onMoveActionPerformed$ = new Subject<MoveActionPerformedEvent>()
		this._onPositionChange$ = new Subject<DNDCharacter>()
	}

	public get onMoveActionPerformed$(): Observable<MoveActionPerformedEvent> {
		return this._onMoveActionPerformed$.asObservable()
	}

	public get onPositionChange$(): Observable<DNDCharacter> {
		return this._onPositionChange$.asObservable()
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	public enterPhaseInput(actor: DNDCharacter, newPos?: Position): void {
		switch (this._currentPhase) {
			case ActionPhase.MOVEMENT_SPEED_CHECK:
				if (newPos === undefined) {
					throw new Error(
						'DNDMoveAction -> enterPhaseInput() -> MOVEMENT_SPEED_CHECK: newPos is undefined!'
					)
				}

				if (actor.currentMovementSpeed <= 0) {
					throw new Error(
						`DNDMoveAction -> enterPhaseInput() -> MOVEMENT_SPEED_CHECK: Actor \"${actor.name}\" has no movement speed!`
					)
				}

				if (actor.pos.x === newPos.x && actor.pos.y === newPos.y) {
					this._currentPhase = ActionPhase.COMPLETED
					return
				}

				this._pathFinder.maxPathCost = actor.currentMovementSpeed
				this._pathFinder.needChecksForCellsContent = true
				this._pathFinder.isStepCostConstant = false
				const pathFinderResults = this._pathFinder.shortestPath(
					actor.pos,
					newPos
				)
				this._path = pathFinderResults.path
				if (actor.stateMachine.currentState === DNDCharacterState.TURN)
					actor.updateMovementSpeed(pathFinderResults.cost)

				this._currentPhase = ActionPhase.MOVE
				this._onMoveActionPerformed$.next({ actor, newPos })
				break
			case ActionPhase.MOVE:
				if (this._path.length !== 0) {
					actor.pos = this._path[this._path.length - 1].pos
				}
				this._currentPhase = ActionPhase.COMPLETED
				this._onPositionChange$.next(actor)
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error('DNDMoveAction -> enterPhaseInput(): Unknown phase!')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.MOVEMENT_SPEED_CHECK
		this._path = []
	}
}
