import Player from '../Entities/Player'
import Grid from '../Grid/Grid'
import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import MapModel from './MapModel'

export default class GridOfCellsModel extends MapModel {
	private _grid: Grid

	constructor(data: GridOfCellsLogicData) {
		const player = new Player(data.player)
		super(player)

		this._grid = new Grid(data.gridSizes.width, data.gridSizes.height)
		this._grid.cell(player.pos).putContent(player)
	}

	public get grid(): Grid {
		return this._grid
	}
}
