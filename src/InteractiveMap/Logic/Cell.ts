export type Coordinates = { x: number; y: number }

export default class Cell {
	private _x: number
	private _y: number
	public content: any

	constructor(x: number, y: number, content?: any) {
		this._x = x
		this._y = y
		this.content = content
	}

	public get x(): number {
		return this._x
	}

	public get y(): number {
		return this._y
	}
}
