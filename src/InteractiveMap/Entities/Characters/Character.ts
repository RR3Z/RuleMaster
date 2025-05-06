import EquipmentManager from '../../EquipmentManager/EquipmentManager'
import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _equipment!: EquipmentManager
	protected _name!: string
	protected _maxHealth!: number
	protected _health!: number

	public get name(): string {
		return this._name
	}

	public get health(): number {
		return this._health
	}

	public abstract get equipmentManager(): EquipmentManager

	public abstract takeDamage(damage: number): void
}
