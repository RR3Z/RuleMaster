import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'
import Logger from '../Logger'
import { DNDLogData } from './DNDLogData'
import { DNDLogType } from './DNDLogType'
import { DNDRollDetails } from './Details/DNDRollDetails'

export default class DNDMapLogger extends Logger {
	private readonly _logs: DNDLogData[]

	private _activeCharacterName: string
	private _lastRollFormulas: DiceRollerFormula[]
	private _lastRollResults: DiceRollerResult[]

	constructor(diceRoller: DiceRoller) {
		super()

		this._logs = []
		this._activeCharacterName = '' // TODO: брать из InteractiveMapModel
		this._lastRollFormulas = []
		this._lastRollResults = []

		// Dice Roller Events
		diceRoller.onNewRoll$.subscribe((rollFormulas: DiceRollerFormula[]) => {
			this._lastRollFormulas = rollFormulas
		})
		diceRoller.onRollEnd$.subscribe((rollResults: DiceRollerResult[]) => {
			this._lastRollResults = rollResults
			this.onRoll()
		})
	}

	public get logs(): DNDLogData[] {
		return this._logs
	}

	public newLog(data: DNDLogData): void {
		this._logs.push(data)
	}

	public clear(): void {
		if (this._logs.length < this._maxLogsNumber)
			console.warn(
				`DNDMapLogger -> Still have space for new logs (${this._logs.length}/${this._maxLogsNumber})`
			)

		this._logs.splice(0, this._logs.length)
		this._activeCharacterName = ''
		this._lastRollFormulas = []
		this._lastRollResults = []
	}

	private onRoll(): void {
		const details: DNDRollDetails = {
			formulas: this._lastRollFormulas,
			results: this._lastRollResults,
		}

		const log: DNDLogData = {
			type: DNDLogType.ROLL,
			actorName: this._activeCharacterName,
			details: details,
		}

		this.newLog(log)
	}
}
