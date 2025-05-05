import CellsAStarPathFinder from '../AStarPathFinder/CellsAStarPathFinder'
import DNDActionsManager from '../ActionsManager/DNDActionsManager'
import DNDCharacter from '../Entities/Characters/DNDCharacter'
import { EntityType } from '../Entities/EntityType'
import GridOfCells from '../Grid/GridOfCells'
import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import MapModel from './MapModel'

export default class DNDMapModel extends MapModel {
	private _grid: GridOfCells
	private _pathFinder: CellsAStarPathFinder

	constructor(data: GridOfCellsLogicData) {
		super()

		this._player = new DNDCharacter(EntityType.PLAYER, data.player)
		this._grid = new GridOfCells(data, this._player)
		this._pathFinder = new CellsAStarPathFinder(this._grid)
		this._actionsManager = new DNDActionsManager(this._pathFinder)
	}

	public override get actionsManager(): DNDActionsManager {
		return this._actionsManager as DNDActionsManager
	}

	public get grid(): GridOfCells {
		return this._grid
	}
}
