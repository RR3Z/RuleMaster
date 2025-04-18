import Boundary from '../Entities/Boundary'
import Enemy from '../Entities/Characters/Enemy'
import { EnemyData } from '../Entities/Characters/Enemy.d'
import Player from '../Entities/Characters/Player'
import { PlayerData } from '../Entities/Characters/Player.d'
import Entity, { EntityType } from '../Entities/Entity'

export type CellContentData = {
	type: EntityType | undefined
	data: PlayerData | EnemyData | undefined
}

export type CellData = {
	x: number
	y: number
	content: CellContentData
}

export default class Cell {
	private _x: number
	private _y: number
	private _content: Entity | undefined

	public neighbors: Set<Cell>

	constructor(data: CellData) {
		this._x = data.x
		this._y = data.y
		this.setContent(data.content)

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

	private setContent(data: CellContentData): void {
		switch (data.type) {
			case EntityType.BOUNDARY:
				this._content = new Boundary()
				break
			case EntityType.PLAYER:
				this._content = new Player(data.data as PlayerData)
				break
			case EntityType.ENEMY:
				this._content = new Enemy(data.data as EnemyData)
				break
			case undefined:
				this._content = undefined
				break
		}
	}
}
