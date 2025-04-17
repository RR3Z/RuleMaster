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

	public neighbors: Set<Cell>

	constructor(data: CellData) {
		this._x = data.x
		this._y = data.y
		this._content = data.content

		this.neighbors = new Set()
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
				`Cell (${this._x}, ${this._y}): already has content (${this._content.type})`
			)

		this._content = content
	}

	public pullContent(): Entity | undefined {
		if (this._content === undefined)
			throw new Error(`Cell (${this._x}, ${this._y}): has no content`)
		else if (this._content.type === EntityType.BOUNDARY)
			throw new Error(
				`Cell (${this._x}, ${this._y}): is Boundary (you can't pull it)!`
			)

		const content = this._content
		this._content = undefined
		return content
	}
}
