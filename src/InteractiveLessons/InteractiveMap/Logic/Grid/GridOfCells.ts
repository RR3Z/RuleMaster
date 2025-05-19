import Boundary from '@/InteractiveLessons/Entities/Boundary'
import Character from '@/InteractiveLessons/Entities/Character/Character'
import { Position } from '@/InteractiveLessons/Types/Position'
import Cell from './Cell'
import { GridOfCellsLogicData } from './GridOfCellsLogicData'

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

	// TODO: add enemies
	private fill(data: GridOfCellsLogicData, player: Character): void {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				const newCell = new Cell({ x, y })
				this._cells[x][y] = newCell

				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue

						const nx = x + dx
						const ny = y + dy

						if (
							nx >= 0 &&
							nx < this._width &&
							ny >= 0 &&
							ny < this._height &&
							this._cells[nx][ny]
						) {
							const neighbor = this._cells[nx][ny]
							newCell.addNeighbor(neighbor)
							neighbor.addNeighbor(newCell)
						}
					}
				}
			}
		}

		// Add World Boundaries
		for (const boundaryPos of data.boundaries)
			this._cells[boundaryPos.x][boundaryPos.y].putContent(new Boundary())

		// Add Player
		this._cells[player.pos.x][player.pos.y].putContent(player)

		// TODO: Add Enemies
	}
}
