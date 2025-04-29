import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _name!: string
	protected _maxHealth!: number
	protected _currentHealth!: number

	public get name(): string {
		return this._name
	}

	public get currentHealth(): number {
		return this._currentHealth
	}
}
