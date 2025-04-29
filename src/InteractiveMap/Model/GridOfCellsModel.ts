import CharactersFabric from '../Entities/Characters/CharactersFabric'
import Grid from '../Grid/Grid'
import { GameType } from '../_Types/GameType'
import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import MapModel from './MapModel'

export default class GridOfCellsModel extends MapModel {
	private _grid: Grid

	constructor(gameType: GameType, data: GridOfCellsLogicData) {
		super()

		this._gameType = gameType

		this._player = CharactersFabric.createPlayer(gameType, data.player)

		this._grid = new Grid(data.gridSizes.width, data.gridSizes.height)
		this._grid.cell(this._player.pos).putContent(this._player)
	}

	public get grid(): Grid {
		return this._grid
	}
}
