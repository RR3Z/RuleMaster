import Character from '../Entities/Characters/Character'
import DNDCharacter from '../Entities/Characters/DNDCharacter'
import { EntityType } from '../Entities/EntityType'
import GridOfCells from '../Grid/GridOfCells'
import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import { Position } from '../_Types/Position'
import MapModel from './MapModel'

export default class DNDMapModel extends MapModel {
	private _grid: GridOfCells

	constructor(data: GridOfCellsLogicData) {
		super()

		// Entities
		this._player = new DNDCharacter(EntityType.PLAYER, data.player)

		// Grid
		this._grid = new GridOfCells(data, this._player)
	}

	public get grid(): GridOfCells {
		return this._grid
	}

	// TODO: Подключиmь здесь AStarPathFinder
	public moveCharacterTo(character: Character, newPos: Position): void {
		const dndCharacter = character as DNDCharacter
		const currentPosCell = this._grid.cell(dndCharacter.pos)
		const newPosCell = this._grid.cell(newPos)

		if (newPosCell.contentType !== null)
			throw new Error(
				'DNDMapModel -> moveCharacterTo(): Сell at the given position is already occupied'
			)

		const content = currentPosCell.pullContent()
		newPosCell.putContent(content)

		dndCharacter.pos$.next(newPos)
	}
}
