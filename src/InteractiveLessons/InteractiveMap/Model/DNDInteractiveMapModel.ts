import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import DNDInitiativeManager from '@/InteractiveLessons/InitiativeManager/DND/DNDInitiativeManager'
import GridOfCells from '../Logic/Grid/GridOfCells'
import { GridOfCellsLogicData } from '../Logic/Grid/GridOfCellsLogicData'
import CellsAStarPathFinder from '../Logic/PathFinder/CellsAStarPathFinder'
import InteractiveMapModel from './InteractiveMapModel'

export default class DNDInteractiveMapModel extends InteractiveMapModel {
	private _grid: GridOfCells
	private _pathFinder: CellsAStarPathFinder
	private _initiativeManager: DNDInitiativeManager

	constructor(data: GridOfCellsLogicData) {
		super()

		if (data.player.type !== 'DND') {
			throw new Error(
				'DNDInteractiveMapModel -> constructor(): Wrong Player Data'
			)
		}

		this._player = new DNDCharacter(
			EntityType.PLAYER,
			data.player.data,
			data.player.startPos,
			data.player.startState
		)
		this._grid = new GridOfCells(data, this._player, [])
		this._pathFinder = new CellsAStarPathFinder(this._grid)
		this._actionsManager = new DNDActionsManager(this._pathFinder, this._grid)
		this._initiativeManager = new DNDInitiativeManager()
	}

	public override get actionsManager(): DNDActionsManager {
		return this._actionsManager as DNDActionsManager
	}

	public override get player(): DNDCharacter {
		return this._player as DNDCharacter
	}

	public get grid(): GridOfCells {
		return this._grid
	}

	public get initiativeManager(): DNDInitiativeManager {
		return this._initiativeManager
	}
}
