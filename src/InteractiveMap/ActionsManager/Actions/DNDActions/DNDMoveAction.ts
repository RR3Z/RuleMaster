import { ActionPhase } from '../../../_Types/ActionPhase'
import { Position } from '../../../_Types/Position'
import CellsAStarPathFinder from '../../../AStarPathFinder/CellsAStarPathFinder'
import Character from '../../../Entities/Characters/Character'
import DNDCharacter from '../../../Entities/Characters/DNDCharacter'
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
		const dndActor = actor as DNDCharacter

		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				if (newPos === undefined)
					throw new Error(
						'DNDMoveAction -> enterPhaseInput() -> RANGE_CHECK: newPos is undefined!'
					)

				if (dndActor.pos.x === newPos.x && dndActor.pos.y === newPos.y) {
					this._currentPhase = ActionPhase.COMPLETE
					return
				}
				if (dndActor.movementDistance === 0)
					throw new Error(
						`DNDMoveAction -> enterPhaseInput(): \"${dndActor.name}\" can't move (movement distance is 0)!`
					)

				this._pathFinder.maxPathCost = dndActor.movementDistance
				this._path = this._pathFinder.shortestPath(dndActor.pos, newPos)
				this._currentPhase = ActionPhase.MOVING
				this.enterPhaseInput(dndActor)
				break
			case ActionPhase.MOVING:
				if (this._path.length !== 0)
					dndActor.pos$.next(this._path[this._path.length - 1].pos)
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
