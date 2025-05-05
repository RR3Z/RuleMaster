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

		player.pos$.subscribe((newPos: Position) => this.onPlayerPosChange(newPos))
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
				const newCell = new Cell({ x, y })
				this._cells[x][y] = newCell

				// Add Neighbors for newCell
				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue // Skip newCell

						const nx = x + dx
						const ny = y + dy

						// Check if cell exists in that direction
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

		// Add Walls
		for (const wallPos of data.walls)
			this._cells[wallPos.x][wallPos.y].putContent(new Wall(wallPos))
		// Add Player
		this._cells[data.player.pos.x][data.player.pos.y].putContent(player)
		// TODO: Add Enemies
	}

	private onPlayerPosChange(newPos: Position): void {
		const oldPos = this.playerPos()
		if (oldPos.x === newPos.x && oldPos.y === newPos.y) return

		const oldPosCell = this.cell(oldPos)
		const newPosCell = this.cell(newPos)

		if (newPosCell.contentType !== null)
			throw new Error(
				'DNDMapModel -> moveCharacterTo(): Сell at the given position is already occupied'
			)

		const content = oldPosCell.pullContent()
		newPosCell.putContent(content)
	}
}
