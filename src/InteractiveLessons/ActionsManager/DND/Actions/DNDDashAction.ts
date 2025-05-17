import { DNDEffectType } from '@/InteractiveLessons/EffectsManager/DND/DNDEffectType'
import DNDDashEffect from '@/InteractiveLessons/EffectsManager/DND/Effects/DNDDashEffect'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
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

	public enterPhaseInput(actor: DNDCharacter): void {
		switch (this._currentPhase) {
			case ActionPhase.DASH:
				if (actor.effectsManager.has(DNDEffectType.DASH)) {
					throw new Error(
						`DNDDashAction -> enterPhaseInput() -> DASH: Character \"${actor.name}\" already has a dash!`
					)
				}

				actor.effectsManager.add(new DNDDashEffect())
				this._currentPhase = ActionPhase.COMPLETED
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
