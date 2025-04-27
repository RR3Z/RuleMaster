import { EntityType } from '../Entities/EntityType'
import IEntity from '../Entities/IEntity'

export default class Cell {
	private readonly _x: number
	private readonly _y: number
	private _content: IEntity | undefined

	constructor(x: number, y: number, content: IEntity | undefined = undefined) {
		this._x = x
		this._y = y
		this._content = content
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

	public putContent(content: IEntity): void {
		if (this._content !== undefined)
			throw new Error(
				`Cell (${this._x}, ${this._y}): already has content (${this._content.type})`
			)

		this._content = content
	}

	public pullContent(): IEntity {
		if (this._content === undefined)
			throw new Error(`Cell (${this._x}, ${this._y}): has no content`)
		else if (this._content.type === EntityType.WALL)
			throw new Error(
				`Cell (${this._x}, ${this._y}): is Wall (you can't pull it)!`
			)

		const content = this._content
		this._content = undefined
		return content
	}
}
