import { DNDCharacterData } from '../_Types/DNDCharacterData'
import Entity from './Entity'
import { EntityType } from './EntityType'

export default abstract class Character extends Entity {
	protected _name: string
	protected _maxHealth: number
	protected _currentHealth: number

	constructor(entityType: EntityType, data: DNDCharacterData) {
		super(entityType, data.pos)

		this._name = data.name
		this._maxHealth = data.maxHealth
		this._currentHealth = this._maxHealth
	}

	public get name(): string {
		return this._name
	}

	public get currentHealth(): number {
		return this._currentHealth
	}
}
