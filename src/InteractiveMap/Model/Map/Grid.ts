import { GridData, Position } from '../../_Types/Map.ts'
import VisualUtils from '../../VisualUtils.ts'
import Boundary from '../Entities/Boundary.ts'
import Player from '../Entities/Characters/Player.ts'
import Cell from './Cell.ts'

export default class Grid {
	// Settings
	private _width: number
	private _height: number
	private _cells!: Cell[][]

	constructor(data: GridData, player: Player) {
		VisualUtils.gridHeight = data.height
		VisualUtils.gridWidth = data.width

		this._width = data.width
		this._height = data.height

		this.fill(data.boundaries, player)
	}

	public get width(): number {
		return this._width
	}

	public get height(): number {
		return this._height
	}

	public cells(): Readonly<Cell[][]> {
		return this._cells
	}

	public cell(x: number, y: number): Cell {
		if (x < 0 || x >= this._width || y < 0 || y >= this._height)
			throw new Error(`Grid -> cell(): Out of bounds(x=${x}, y=${y})`)

		return this._cells[x][y]
	}

	private fill(boundaries: Position[], player: Player): void {
		// Creating an empty two-dimensional array corresponding to the grid size
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		// Filling grid with cells
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				this._cells[x][y] = new Cell({ x: x, y: y })
			}
		}

		// Set Boundaries
		boundaries.forEach((pos: Position) => {
			this._cells[pos.x][pos.y].putContent(new Boundary(pos))
		})

		// Set Player
		this._cells[player.position.value.x][player.position.value.y].putContent(
			player
		)

		// Set neighbors for cells
		let neighbors: Set<Cell>
		const direction = [
			{ dx: 1, dy: 0 },
			{ dx: -1, dy: 0 },
			{ dx: 0, dy: 1 },
			{ dx: 0, dy: -1 },
			{ dx: 1, dy: 1 },
			{ dx: 1, dy: -1 },
			{ dx: -1, dy: 1 },
			{ dx: -1, dy: -1 },
		]
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				neighbors = new Set()

				direction.forEach(dir => {
					if (
						x + dir.dx >= 0 &&
						x + dir.dx < this._width &&
						y + dir.dy >= 0 &&
						y + dir.dy < this._height
					)
						neighbors.add(this._cells[x + dir.dx][y + dir.dy])
				})

				this._cells[x][y].neighbors = neighbors
			}
		}
	}
}
