import DNDCharacter from '../Entities/Characters/DNDCharacter'
import { EntityType } from '../Entities/EntityType'
import GridOfCells from '../Grid/GridOfCells'
import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import MapModel from './MapModel'

export default class DNDMapModel extends MapModel {
	private _grid: GridOfCells

	constructor(data: GridOfCellsLogicData) {
		super()

		// Entities
		this._player = new DNDCharacter(EntityType.PLAYER, data.player)

		// Grid
		this._grid = new GridOfCells(data.sizes.width, data.sizes.height)
		this._grid.cell(data.player.pos).putContent(this._player)
	}

	public get grid(): GridOfCells {
		return this._grid
	}
}
