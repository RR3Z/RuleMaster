import Character from '@/InteractiveLessons/Entities/Character/Character'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDDashAction implements IPhasedAction {
	private _currentPhase: ActionPhase

	constructor() {
		this._currentPhase = ActionPhase.DASH
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	// TODO:
	public enterPhaseInput(actor: Character): void {
		switch (this._currentPhase) {
			case ActionPhase.DASH:
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error('DNDDashAction -> enterPhaseInput(): Unknown phase!')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.DASH
	}
}
