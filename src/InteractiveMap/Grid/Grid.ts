import Cell from './Cell'

export default class Grid {
	private _width: number
	private _height: number
	private _cells: Cell[][]

	constructor(width: number, height: number) {
		this._width = width
		this._height = height
		this._cells = Array.from({ length: this._width }, () =>
			Array.from({ length: this._height } as Cell[])
		)

		this.fillGrid()
	}

	public get width(): number {
		return this._width
	}

	public get height(): number {
		return this._height
	}

	public cell(x: number, y: number): Cell {
		return this._cells[x][y]
	}

	private fillGrid(): void {
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				this._cells[x][y] = new Cell(x, y)
			}
		}
	}
}
