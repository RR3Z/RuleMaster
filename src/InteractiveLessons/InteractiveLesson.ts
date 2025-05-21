import { Object3D } from 'three'
import DiceRoller from './DiceRoller/DiceRoller'
import { DiceType } from './DiceRoller/Types/DiceType'
import { Game } from './Types/Game'

export default class InteractiveLesson {
	private _diceRoller: DiceRoller

	constructor(game: Game, dicesVisual: Map<DiceType, Object3D>) {
		this._diceRoller = new DiceRoller(dicesVisual)
	}

	public get diceRoller(): DiceRoller {
		return this._diceRoller
	}
}
