import Cell, { CellData } from './Cell.ts'

export interface GridData {
	width: number
	height: number
	cells: Set<CellData>
}

export default class Grid {
	private _width: number
	private _height: number
	private _cells!: Cell[][]

	constructor(data: GridData) {
		this._width = data.width
		this._height = data.height
		this.fill(data.cells)
	}

	public cell(x: number, y: number) {
		return this._cells[x][y]
	}

	private fill(cellsData: Set<CellData>): void {
		// Creating an empty two-dimensional array corresponding to the grid size
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		cellsData.forEach((cellData: CellData) => {
			this._cells[cellData.x][cellData.y] = new Cell(cellData)
		})
	}
}
