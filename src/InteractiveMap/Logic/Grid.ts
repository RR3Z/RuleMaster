import Cell from './Cell.ts'

export default class Grid {
	private _width: number
	private _height: number
	private _cells: Cell[]

	constructor(width: number, height: number) {
		this._width = width
		this._height = height
		this._cells = []

		this.fillWithCells()
	}

	public get cells(): Cell[] {
		return this._cells
	}

	private fillWithCells(): void {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				this._cells.push(new Cell(x, y))
			}
		}
	}
}
