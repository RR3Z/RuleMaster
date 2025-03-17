import Entity from './Entities/Entity.ts'

export type Coordinates = { x: number; y: number }

export default class Cell {
	private _x: number
	private _y: number
	public _content: Entity | null = null

	constructor(x: number, y: number, content?: Entity) {
		this._x = x
		this._y = y
		if (content) this._content = content
	}

	public get x(): number {
		return this._x
	}

	public get y(): number {
		return this._y
	}
}
