import { BehaviorSubject, Observable } from 'rxjs'
import { DicesRollFormula } from './_Types/DicesRollFormula'
import { DicesRollResult } from './_Types/DicesRollResult'
import DiceRollerEngine from './Engine/DiceRollerEngine'

export default class DiceRoller {
	private _engine: DiceRollerEngine
	private readonly _rollResults$: BehaviorSubject<DicesRollResult[]>

	constructor() {
		this._engine = new DiceRollerEngine()
		this._rollResults$ = new BehaviorSubject<DicesRollResult[]>([])

		this._engine.onRollEnd$.subscribe((rollResults: DicesRollResult[]) =>
			this._rollResults$.next(rollResults)
		)
	}

	public get onRollStart$(): Observable<void> {
		return this._engine.onRollStart$
	}

	public get onRollEnd$(): Observable<DicesRollResult[]> {
		return this._engine.onRollEnd$
	}

	public get rollResults$(): Observable<DicesRollResult[]> {
		return this._rollResults$.asObservable()
	}

	public get rollResults(): DicesRollResult[] {
		return this._rollResults$.value
	}

	public async init(dicesModelFilePath: string): Promise<void> {
		await this._engine.init(dicesModelFilePath)
	}

	public makeRoll(formulas: DicesRollFormula[]): void {
		this._engine.addDices(formulas)
	}
}
