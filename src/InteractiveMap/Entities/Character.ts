import { Position } from '../Types/Position'
import Entity from './Entity'
import { EntityType } from './EntityType'

export default abstract class Character extends Entity {
	protected _name!: string
	protected _maxHealth!: number
	protected _currentHealth!: number

	constructor(entityType: EntityType, pos: Position) {
		super(entityType, pos)
	}

	public get name(): string {
		return this._name
	}

	public get currentHealth(): number {
		return this._currentHealth
	}
}
