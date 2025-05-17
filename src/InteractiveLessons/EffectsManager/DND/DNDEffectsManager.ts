import { Observable, Subject } from 'rxjs'
import { DNDEffectType } from './DNDEffectType'

export default class DNDEffectsManager {
	private _effects: Set<DNDEffectType>
	private _onNewEffect$: Subject<DNDEffectType>
	private _onRemoveEffect$: Subject<DNDEffectType>

	constructor(effects?: DNDEffectType[]) {
		this._effects = new Set()
		if (effects && effects.length > 0) {
			for (const effect of effects) this.apply(effect)
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

	public apply(effect: DNDEffectType): void {
		if (this._effects.has(effect)) {
			throw new Error(
				'DNDEffectsManager -> apply(): Character already has this effect!'
			)
		}

		this._effects.add(effect)
		this._onNewEffect$.next(effect)
	}

	public remove(effect: DNDEffectType): void {
		if (!this._effects.has(effect)) {
			throw new Error(
				"DNDEffectsManager -> apply(): Character don't have this effect!"
			)
		}

		this._effects.delete(effect)
		this._onRemoveEffect$.next(effect)
	}

	public has(effect: DNDEffectType): boolean {
		return this._effects.has(effect)
	}
}
