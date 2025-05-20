import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'
import { DNDSpellData } from '@/InteractiveLessons/Spells/DND/DNDSpellData'
import Logger from '../Logger'
import { DNDLogData } from './DNDLogData'
import { DNDLogType } from './DNDLogType'
import { DNDRollDetails } from './Details/DNDRollDetails'
import { DNDSpellCastDetails } from './Details/DNDSpellCastDetails'

export default class DNDMapLogger extends Logger {
	private readonly _logs: DNDLogData[]

	private _activeCharacterName: string
	private _lastRollFormulas: DiceRollerFormula[]
	private _lastRollResults: DiceRollerResult[]

	constructor(diceRoller: DiceRoller, actionsManager: DNDActionsManager) {
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

		// Actions Manager events
		actionsManager.onMeleeAttack$.subscribe(() => {
			this.onMeleeAttack()
		})
		actionsManager.onRangedAttack$.subscribe(() => {
			this.onRangedAttack()
		})
		actionsManager.onSpellCast$.subscribe((spell: DNDSpellData) => {
			this.onSpellCast(spell)
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

	private onMeleeAttack(): void {
		const log: DNDLogData = {
			type: DNDLogType.CHARACTER_MELEE_ATTACK,
			actorName: this._activeCharacterName,
			details: undefined,
		}

		this.newLog(log)
	}

	private onRangedAttack(): void {
		const log: DNDLogData = {
			type: DNDLogType.CHARACTER_RANGED_ATTACK,
			actorName: this._activeCharacterName,
			details: undefined,
		}

		this.newLog(log)
	}

	private onSpellCast(spell: DNDSpellData): void {
		const details: DNDSpellCastDetails = {
			spellName: spell.name,
		}

		const log: DNDLogData = {
			type: DNDLogType.CHARACTER_SPELL_CAST,
			actorName: this._activeCharacterName,
			details: details,
		}

		this.newLog(log)
	}
}
