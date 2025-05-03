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

	// TODO: добавить логику, что персонаж не может останавливаться в клетках, где уже что-то есть
	public moveCharacterTo(character: Character, newPos: Position): void {
		const dndCharacter = character as DNDCharacter
		dndCharacter.pos$.next(newPos)
	}
}
