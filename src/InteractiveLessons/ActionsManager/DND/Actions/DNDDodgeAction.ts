import { DNDEffectType } from '@/InteractiveLessons/EffectsManager/DND/DNDEffectType'
import DNDDodgeEffect from '@/InteractiveLessons/EffectsManager/DND/Effects/DNDDodgeEffect'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { ActionPhase } from '../../ActionPhase'
import { IPhasedAction } from '../../IPhasedAction'

export default class DNDDodgeAction implements IPhasedAction {
	private _currentPhase: ActionPhase

	constructor() {
		this._currentPhase = ActionPhase.DODGE
	}

	public currentPhase(): ActionPhase {
		return this._currentPhase
	}

	public enterPhaseInput(actor: DNDCharacter): void {
		switch (this._currentPhase) {
			case ActionPhase.DODGE:
				if (actor.effectsManager.has(DNDEffectType.DODGE)) {
					throw new Error(
						`DNDDodgeAction -> enterPhaseInput() -> DODGE: Character \"${actor.name}\" already has a Dodge!`
					)
				}

				actor.effectsManager.add(new DNDDodgeEffect())
				this._currentPhase = ActionPhase.COMPLETED
				break
			case ActionPhase.COMPLETED:
				/* NOTHING TO DO HERE */
				break
			default:
				throw new Error('DNDDodgeAction -> enterPhaseInput(): Unknown phase!')
		}
	}

	public reset(): void {
		this._currentPhase = ActionPhase.DODGE
	}
}
