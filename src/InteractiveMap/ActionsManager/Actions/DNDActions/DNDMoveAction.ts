import { ActionPhase } from '../../../_Types/ActionPhase'
import { Position } from '../../../_Types/Position'
import CellsAStarPathFinder from '../../../AStarPathFinder/CellsAStarPathFinder'
import Character from '../../../Entities/Characters/Character'
import Cell from '../../../Grid/Cell'
import IPhasedAction from '../IPhasedAction'

export default class DNDMoveAction implements IPhasedAction {
	// Fields
	private _currentPhase: ActionPhase
	private _path: Cell[]

	// Dependecies
	private _pathFinder: CellsAStarPathFinder

	constructor(pathFinder: CellsAStarPathFinder) {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._path = []

		this._pathFinder = pathFinder
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	public enterPhaseInput(actor: Character, newPos?: Position): void {
		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				if (newPos === undefined)
					throw new Error(
						'DNDMoveAction -> enterPhaseInput() -> RANGE_CHECK: newPos is undefined!'
					)

				if (actor.pos.x === newPos.x && actor.pos.y === newPos.y) {
					this._currentPhase = ActionPhase.COMPLETE
					return
				}
				if (actor.movementDistance === 0)
					throw new Error(
						`DNDMoveAction -> enterPhaseInput(): \"${actor.name}\" can't move (movement distance is 0)!`
					)

				this._pathFinder.maxPathCost = actor.movementDistance
				this._path = this._pathFinder.shortestPath(actor.pos, newPos)
				this._currentPhase = ActionPhase.MOVING
				this.enterPhaseInput(actor)
				break
			case ActionPhase.MOVING:
				if (this._path.length !== 0)
					actor.pos$.next(this._path[this._path.length - 1].pos)
				this._currentPhase = ActionPhase.COMPLETE
				break
			case ActionPhase.COMPLETE:
				// Nothing to do here
				break
			default:
				throw new Error('DNDMoveAction -> enterPhaseInput(): Invalid Phase')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
		this._path = []
	}
}
