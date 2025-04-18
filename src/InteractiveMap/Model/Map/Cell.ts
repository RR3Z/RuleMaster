import { EntityType } from '../../_Enums/EntityType.ts'
import { EnemyData, PlayerData } from '../../_Types/Characters.ts'
import { CellContentData, CellData } from '../../_Types/Map.ts'
import Boundary from '../Entities/Boundary.ts'
import Enemy from '../Entities/Characters/Enemy.ts'
import Player from '../Entities/Characters/Player.ts'
import Entity from '../Entities/Entity.ts'

export default class Cell {
	public neighbors: Set<Cell>

	private _x: number
	private _y: number
	private _content: Entity | undefined

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
