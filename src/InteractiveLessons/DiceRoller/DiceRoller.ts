import { Observable, Subject } from 'rxjs'
import { Object3D } from 'three'
import { DiceRollerFormula } from './Types/DiceRollerFormula'
import { DiceRollerResult } from './Types/DiceRollerResult'
import { DiceType } from './Types/DiceType'
import DiceRollerEngine from './Visual/Engine/DiceRollerEngine'

export default class DiceRoller {
	// Fields
	private readonly _engine: DiceRollerEngine

	// Events
	private readonly _onSelectDices$: Subject<DiceRollerFormula[]>

	constructor(dicesVisual: Map<DiceType, Object3D>) {
		this._onSelectDices$ = new Subject<DiceRollerFormula[]>()
		this._engine = new DiceRollerEngine(dicesVisual)
	}

	public makeRoll(formulas: DiceRollerFormula[]): void {
		this._engine.addDices(formulas)
	}

	public selectDices(formulas: DiceRollerFormula[]) {
		this._onSelectDices$.next(formulas)
	}

	public get canvas(): HTMLCanvasElement {
		return this._engine.canvas
	}

	public get onNewRoll$(): Observable<DiceRollerFormula[]> {
		return this._engine.onNewRoll$
	}

	public get onRollEnd$(): Observable<DiceRollerResult[]> {
		return this._engine.onRollEnd$
	}

	public get onSelectDices$(): Observable<DiceRollerFormula[]> {
		return this._onSelectDices$.asObservable()
	}
}
