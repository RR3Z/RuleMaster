import { EntityType } from '../../_Enums/EntityType.ts'
import { Position } from '../../_Types/Map.ts'
import Entity from '../Entities/Entity.ts'

export default class Cell {
	public neighbors: Set<Cell>

	private _x: number
	private _y: number
	private _content: Entity | undefined

	constructor(pos: Position) {
		this._x = pos.x
		this._y = pos.y
		this._content = undefined

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

	public putContent(content: Entity): void {
		if (this._content !== undefined)
			throw new Error(
				`Cell (${this._x}, ${this._y}): already has content (${this._content.type})`
			)

		this._content = content
	}

	public pullContent(): Entity {
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
