import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _currentHealth!: number

	public takeDamage(value: number): void {
		this._currentHealth -= value

		if (this._currentHealth < 0) this._currentHealth = 0
		// TODO: перейти в состояние смерти
	}
}
