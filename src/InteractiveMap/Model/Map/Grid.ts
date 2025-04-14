import Cell from './Cell.ts'

export default class Grid {
	private _width: number
	private _height: number
	private _cells!: Cell[][]

	constructor(width: number, height: number) {
		this._width = width
		this._height = height
		this.fill()
	}

	public cell(x: number, y: number) {
		return this._cells[x][y]
	}

	private fill(): void {
		this._cells = Array.from({ length: this._width }, () => [])

		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				this._cells[x].push(new Cell(x, y))
			}
		}
	}
}
