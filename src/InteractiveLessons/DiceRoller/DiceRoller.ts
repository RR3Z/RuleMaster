import { Observable } from 'rxjs'
import { DiceRollerFormula } from './Types/DiceRollerFormula'
import { DiceRollerResult } from './Types/DiceRollerResult'
import DiceRollerEngine from './Visual/Engine/DiceRollerEngine'

export default class DiceRoller {
	private _engine: DiceRollerEngine

	constructor() {
		this._engine = new DiceRollerEngine()
	}

	public async init(dicesModelFilePath: string): Promise<void> {
		await this._engine.init(dicesModelFilePath)
	}

	public makeRoll(formulas: DiceRollerFormula[]): void {
		this._engine.addDices(formulas)
	}

	public get onNewRoll$(): Observable<DiceRollerFormula[]> {
		return this._engine.onNewRoll$
	}

	public get onRollEnd$(): Observable<DiceRollerResult[]> {
		return this._engine.onRollEnd$
	}
}
