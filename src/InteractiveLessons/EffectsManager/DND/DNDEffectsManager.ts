import { Observable, Subject } from 'rxjs'
import { DNDEffect } from './DNDEffect'
import { DNDEffectDurationType } from './DNDEffectDurationType'
import { DNDEffectType } from './DNDEffectType'

export default class DNDEffectsManager {
	private _effects: Set<DNDEffect>
	private _onNewEffect$: Subject<DNDEffectType>
	private _onRemoveEffect$: Subject<DNDEffectType>

	constructor(effects?: DNDEffect[]) {
		this._effects = new Set()
		if (effects && effects.length > 0) {
			for (const effect of effects) this.add(effect)
		}

		this._onNewEffect$ = new Subject<DNDEffectType>()
		this._onRemoveEffect$ = new Subject<DNDEffectType>()
	}

	public get onNewEffect$(): Observable<DNDEffectType> {
		return this._onNewEffect$.asObservable()
	}

	public get onRemoveEffect$(): Observable<DNDEffectType> {
		return this._onRemoveEffect$.asObservable()
	}

	public add(effect: DNDEffect): void {
		if (this.has(effect.type)) {
			throw new Error(
				'DNDEffectsManager -> add(): Character already has this effect!'
			)
		}

		this._effects.add(effect)
		this._onNewEffect$.next(effect.type)
	}

	public remove(effect: DNDEffect): void {
		if (!this._effects.has(effect)) {
			throw new Error(
				`DNDEffectsManager -> remove(): Character don't have this effect \'${effect.type}\'!`
			)
		}

		this._effects.delete(effect)
		this._onRemoveEffect$.next(effect.type)
	}

	public removeByType(type: DNDEffectType): void {
		if (!this.has(type)) {
			throw new Error(
				`DNDEffectsManager -> removeByType(): Character don't have this effect \'${type}\'!`
			)
		}

		for (const effect of this._effects) {
			if (effect.type === type) {
				this._effects.delete(effect)
				this._onRemoveEffect$.next(type)
				return
			}
		}
	}

	public has(type: DNDEffectType): boolean {
		for (const effect of this._effects) {
			if (effect.type === type) return true
		}

		return false
	}

	public updateTurn(): void {
		for (const effect of this._effects) {
			if (
				effect.durationType === DNDEffectDurationType.TURNS &&
				effect.expiresIn !== undefined
			) {
				effect.expiresIn -= 1
				if (effect.expiresIn <= 0) {
					this.remove(effect)
				}
				continue
			}

			if (effect.durationType === DNDEffectDurationType.UNTIL_END_OF_TURN) {
				this.remove(effect)
			}
		}
	}
}
