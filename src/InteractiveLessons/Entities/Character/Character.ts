import ActionsManager from '@/InteractiveLessons/ActionsManager/ActionsManager'
import EquipmentManager from '@/InteractiveLessons/EquipmentManager/EquipmentManager'
import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _actionsManager!: ActionsManager
	protected _currentHealth!: number
	protected _equipmentManager!: EquipmentManager

	public takeDamage(value: number): void {
		this._currentHealth -= value

		if (this._currentHealth < 0) this._currentHealth = 0
		// TODO: перейти в состояние смерти
	}
}
