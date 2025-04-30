import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _name!: string
	protected _maxHealth!: number
	protected _health!: number

	public get name(): string {
		return this._name
	}

	public get health(): number {
		return this._health
	}
}
