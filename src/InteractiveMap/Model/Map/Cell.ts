import Entity from '../Entities/Entity'

export interface CellData {
	x: number
	y: number
	content: Entity | undefined
}

export default class Cell {
	private _x: number
	private _y: number
	private _content: Entity | undefined

	constructor(data: CellData) {
		this._x = data.x
		this._y = data.y
		this._content = data.content
	}
}
