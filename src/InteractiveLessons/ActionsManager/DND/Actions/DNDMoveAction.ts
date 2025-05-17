import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import Cell from '@/InteractiveLessons/InteractiveMap/Logic/Grid/Cell'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { Position } from '@/InteractiveLessons/Types/Position'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDMoveAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _path: Cell[]

	// Dependencies
	private _pathFinder: CellsAStarPathFinder

	constructor(pathFinder: CellsAStarPathFinder) {
		this._currentPhase = ActionPhase.MOVEMENT_SPEED_CHECK
		this._path = []

		this._pathFinder = pathFinder
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
				this._path = this._pathFinder.shortestPath(actor.pos, newPos)
				this._currentPhase = ActionPhase.MOVE
				this.enterPhaseInput(actor)
				break
			case ActionPhase.MOVE:
				if (this._path.length !== 0) {
					actor.pos = this._path[this._path.length - 1].pos
				}
				this._currentPhase = ActionPhase.COMPLETED
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
