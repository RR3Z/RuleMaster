import { default as Entity } from '../Entities/Entity'
import { EntityType } from '../Entities/EntityType'
import { Position } from '../_Types/Position'

export default class Cell {
	private readonly _pos: Position
	private _neighbors: Set<Cell>
	private _content: Entity | null

	constructor(
		pos: Position,
		content: Entity | null = null,
		neighbors?: Set<Cell>
	) {
		this._pos = pos
		this._content = content

		if (neighbors) this._neighbors = neighbors
		else this._neighbors = new Set()
	}

	public get contentType(): EntityType | null {
		if (this._content === null) return null
		return this._content?.type
	}

	public get pos(): Readonly<Position> {
		return this._pos
	}

	public get neighbors(): Set<Cell> {
		return this._neighbors
	}

	public get content(): Readonly<Entity> | null {
		return this._content
	}

	public addNeighbor(neighbor: Cell): void {
		if (this._neighbors.has(neighbor))
			throw new Error(
				`Cell -> addNeighbor(): (${this._pos.x}, ${this._pos.y}) already has neighbor (${neighbor.pos.x}, ${neighbor.pos.y})`
			)

		this._neighbors.add(neighbor)
	}

	public putContent(content: Entity): void {
		if (this._content !== null)
			throw new Error(
				`Cell (${this._pos.x}, ${this._pos.y}): already has content (${this._content.type})`
			)

		this._content = content
	}

	public pullContent(): Entity {
		if (this._content === null)
			throw new Error(`Cell (${this._pos.x}, ${this._pos.y}): has no content`)
		else if (this._content.type === EntityType.WALL)
			throw new Error(
				`Cell (${this._pos.x}, ${this._pos.y}): is Wall (you can't pull it)!`
			)

		const content = this._content
		this._content = null
		return content
	}
}
