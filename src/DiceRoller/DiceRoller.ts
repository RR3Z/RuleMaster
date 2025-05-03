import { BehaviorSubject, Observable } from 'rxjs'
import { DiceFormula } from './_Types/DiceFormula'
import { DiceRollResult } from './_Types/DiceRollResult'
import DiceRollerEngine from './Engine/DiceRollerEngine'

export default class DiceRoller {
	private _engine: DiceRollerEngine
	private readonly _rollResults$: BehaviorSubject<DiceRollResult[]>

	constructor() {
		this._engine = new DiceRollerEngine()
		this._rollResults$ = new BehaviorSubject<DiceRollResult[]>([])

		this._engine.onRollEnd$.subscribe((rollResults: DiceRollResult[]) =>
			this._rollResults$.next(rollResults)
		)
	}

	public get onRollStart$(): Observable<void> {
		return this._engine.onRollStart$
	}

	public get onRollEnd$(): Observable<DiceRollResult[]> {
		return this._engine.onRollEnd$
	}

	public get rollResults$(): Observable<DiceRollResult[]> {
		return this._rollResults$.asObservable()
	}

	public get rollResults(): DiceRollResult[] {
		return this._rollResults$.value
	}

	public async init(dicesModelFilePath: string): Promise<void> {
		await this._engine.init(dicesModelFilePath)
	}

	public makeRoll(formulas: DiceFormula[]): void {
		this._engine.addDices(formulas)
	}
}
