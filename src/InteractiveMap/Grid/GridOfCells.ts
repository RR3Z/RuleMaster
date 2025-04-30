import { GridOfCellsLogicData } from '../_Types/GridOfCellsLogicData'
import { Position } from '../_Types/Position'
import Character from '../Entities/Characters/Character'
import { EntityType } from '../Entities/EntityType'
import Wall from '../Entities/Wall'
import Cell from './Cell'

export default class GridOfCells {
	private _width: number
	private _height: number
	private _cells: Cell[][]

	constructor(data: GridOfCellsLogicData, player: Character) {
		this._width = data.sizes.width
		this._height = data.sizes.height
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		this.fill(data, player)
	}

	public get width(): number {
		return this._width
	}

	public get height(): number {
		return this._height
	}

	public cell(pos: Position): Cell {
		return this._cells[pos.x][pos.y]
	}

	public playerPos(): Position {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; x < this._height; x++) {
				if (this._cells[x][y].contentType === EntityType.PLAYER) return { x, y }
			}
		}

		throw new Error("Grid -> playerPos(): Can't find Player on Grid")
	}

	private fill(data: GridOfCellsLogicData, player: Character): void {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				this._cells[x][y] = new Cell({ x, y })
			}
		}

		// Add Walls
		for (const wallPos of data.walls)
			this._cells[wallPos.x][wallPos.y].putContent(new Wall(wallPos))
		// Add Player
		this._cells[data.player.pos.x][data.player.pos.y].putContent(player)
		// TODO: Add Enemies
	}
}
