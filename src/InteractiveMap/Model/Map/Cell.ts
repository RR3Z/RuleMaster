import Entity, { EntityType } from '../Entities/Entity'

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

	public get x(): number {
		return this._x
	}

	public get y(): number {
		return this._y
	}

	public get contentType(): EntityType | undefined {
		return this._content?.type
	}

	public putContent(content: Entity) {
		if (this._content !== undefined)
			throw new Error(
				`Cell (${this._x}, ${this._y}): has already content (${this._content}): `
			)

		this._content = content
	}

	public pullContent(): Entity | undefined {
		if (this._content === undefined)
			throw new Error(`Cell (${this._x}, ${this._y}): has no content `)

		if (this._content.type === EntityType.BOUNDARY) return undefined

		const content = this._content
		this._content = undefined
		return content
	}
}
