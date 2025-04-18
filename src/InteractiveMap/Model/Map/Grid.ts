import Cell, { CellData } from './Cell.ts'

export type GridData = {
	width: number
	height: number
	cells: CellData[]
}

export default class Grid {
	// Settings
	private _width: number
	private _height: number
	private _cells!: Cell[][]

	constructor(data: GridData) {
		this._width = data.width
		this._height = data.height
		this.fill(new Set(data.cells))
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

	private fill(cellsData: Set<CellData>): void {
		// Creating an empty two-dimensional array corresponding to the grid size
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		// Filling grid with cells
		cellsData.forEach((cellData: CellData) => {
			this._cells[cellData.x][cellData.y] = new Cell(cellData)
		})

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
