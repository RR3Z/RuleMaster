import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { Position } from '@/InteractiveLessons/Types/Position'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDMoveAction implements IPhasedAction {
	private _currentPhase: ActionPhase

	constructor() {
		this._currentPhase = ActionPhase.MOVEMENT_SPEED_CHECK
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	// TODO:
	public enterPhaseInput(actor: DNDCharacter, newPos?: Position): void {
		switch (this._currentPhase) {
			case ActionPhase.MOVEMENT_SPEED_CHECK:
				break
			case ActionPhase.MOVE:
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error('DNDMoveAction -> enterPhaseInput(): Unknown phase!')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.MOVEMENT_SPEED_CHECK
	}
}
