import EquipmentManager from '@/InteractiveLessons/EquipmentManager/EquipmentManager'
import { Position } from '@/InteractiveLessons/Types/Position'
import { BehaviorSubject, Observable } from 'rxjs'
import Entity from '../Entity'

export default abstract class Character extends Entity {
	protected _name!: string
	protected _pos$!: BehaviorSubject<Position>
	protected _currentHealth!: number
	protected _equipmentManager!: EquipmentManager

	public takeDamage(value: number): void {
		this._currentHealth -= value

		if (this._currentHealth <= 0) this._currentHealth = 0
	}

	public get pos$(): Observable<Position> {
		return this._pos$!.asObservable()
	}

	public get pos(): Position {
		return this._pos$!.value
	}

	public set pos(newPos: Position) {
		this._pos$!.next(newPos)
	}

	public get currentHealth(): number {
		return this._currentHealth
	}

	public get equipmentManager(): EquipmentManager {
		return this._equipmentManager!
	}

	public get name(): string {
		return this._name
	}
}
