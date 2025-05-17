import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDMeleeAttackAction implements IPhasedAction {
	private _currentPhase: ActionPhase

	constructor() {
		this._currentPhase = ActionPhase.RANGE_CHECK
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	// TODO:
	public enterPhaseInput(
		actor: DNDCharacter,
		targets?: DNDCharacter[],
		hitRolls?: number[],
		damageRolls?: number[]
	): void {
		switch (this._currentPhase) {
			case ActionPhase.RANGE_CHECK:
				break
			case ActionPhase.HIT_CHECK:
				break
			case ActionPhase.APPLY_DAMAGE:
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error(
					'DNDMeleeAttackAction -> enterPhaseInput(): Unknown phase!'
				)
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.RANGE_CHECK
	}
}
