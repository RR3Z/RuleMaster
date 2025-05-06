import { ActionPhase } from '../_Types/ActionPhase'
import CellsAStarPathFinder from '../AStarPathFinder/CellsAStarPathFinder'
import Character from '../Entities/Characters/Character'
import GridOfCells from '../Grid/GridOfCells'
import DNDMeleeAttackAction from './Actions/DNDActions/DNDMeleeAttackAction'
import DNDMoveAction from './Actions/DNDActions/DNDMoveAction'
import IPhasedAction from './Actions/IPhasedAction'
import ActionsManager from './ActionsManager'

export default class DNDActionsManager extends ActionsManager {
	private _currentAction: IPhasedAction | null
	private readonly _moveAction: DNDMoveAction
	private readonly _meleeAttackAction: DNDMeleeAttackAction

	constructor(gridOfCells: GridOfCells, pathFinder: CellsAStarPathFinder) {
		super()

		this._currentAction = null
		this._moveAction = new DNDMoveAction(pathFinder)
		this._meleeAttackAction = new DNDMeleeAttackAction(gridOfCells)
	}

	public get moveAction(): DNDMoveAction {
		return this._moveAction
	}

	public get meleeAttackAction(): DNDMeleeAttackAction {
		return this._meleeAttackAction
	}

	public perform(action: IPhasedAction, actor: Character, ...args: any): void {
		if (
			this._currentAction === null ||
			this._currentAction.currentPhase() === ActionPhase.COMPLETE
		) {
			this._currentAction = action
			this._currentAction.reset()
		} else if (this._currentAction !== action)
			throw new Error(
				'DNDActionsManager -> perform(): Past action is not complete yet!'
			)

		this._currentAction.enterPhaseInput(actor, ...args)
	}
}
