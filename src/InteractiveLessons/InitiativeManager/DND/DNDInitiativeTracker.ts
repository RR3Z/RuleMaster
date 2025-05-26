import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'

export default class DNDInitiativeTracker {
	private _turnsOrder!: DNDCharacter[]
	private _currentIndex!: number

	constructor() {
		this._turnsOrder = []
		this._currentIndex = -1
	}

	public updateTurnsOrder(turnsOrder: DNDCharacter[]): void {
		// Must be minimum 2 combatants
		if (turnsOrder.length < 1)
			throw new Error(
				'DNDInitiativeTracker -> updateTurnsOrder(): turnsOrder length is < 1.'
			)

		this._turnsOrder = turnsOrder
		this._currentIndex = 0
	}

	public next(): { prev: DNDCharacter; current: DNDCharacter } {
		const prev = this._turnsOrder[this._currentIndex]

		if (!this._turnsOrder || this._turnsOrder.length === 0)
			throw new Error('DNDInitiativeTracker -> next(): Turns not initialized!')

		if (this._currentIndex === this._turnsOrder.length - 1)
			this._currentIndex = 0
		else this._currentIndex += 1

		const current = this._turnsOrder[this._currentIndex]

		return { prev, current }
	}

	public get turnsOrder(): DNDCharacter[] {
		return this._turnsOrder
	}

	public get activeCharacter(): DNDCharacter {
		return this._turnsOrder[this._currentIndex]
	}
}
