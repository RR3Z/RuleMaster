import Entity from './Entities/Entity.ts'

export type Coordinates = { x: number; y: number }

export default class Cell {
	private _x: number
	private _y: number
	private _content: Entity | undefined = undefined

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

	public putContent(content: Entity): void {
		if (this._content)
			throw new Error(
				'Trying put content to cell when it is not empty! Position: ' +
					this._x +
					' ' +
					this._y
			)

		this._content = content
	}

	public pullContent(): Entity | undefined {
		if (this._content === undefined)
			throw new Error(
				'Trying get content from cell when it is empty! Position: ' +
					this._x +
					' ' +
					this._y
			)


		const content = this._content
		this._content = undefined
		return content
	}
}
