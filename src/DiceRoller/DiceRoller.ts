import { Observable, Subject } from 'rxjs'
import { DiceFormula } from './_Types/DiceFormula'
import { DiceRollResult } from './_Types/DiceRollResult'
import DiceRollerEngine from './Engine/DiceRollerEngine'

export default class DiceRoller {
	private _engine: DiceRollerEngine
	private readonly _rollResults$: Subject<DiceRollResult[]>

	constructor() {
		this._engine = new DiceRollerEngine()
		this._rollResults$ = new Subject<DiceRollResult[]>()

		this._engine.onRollEnd$.subscribe(rollResults =>
			this._rollResults$.next(rollResults)
		)
	}

	public get rollResults$(): Observable<DiceRollResult[]> {
		return this._rollResults$.asObservable()
	}

	public async init(dicesModelFilePath: string): Promise<void> {
		await this._engine.init(dicesModelFilePath)
	}

	public makeRoll(formulas: DiceFormula[]): void {
		this._engine.addDices(formulas)
	}
}
