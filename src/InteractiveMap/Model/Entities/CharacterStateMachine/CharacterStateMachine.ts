import { CharacterState } from '../../../_Enums/CharacterState.ts'

export default class CharacterStateMachine {
	private _currentState!: CharacterState

	constructor() {
		this._currentState = CharacterState.DEFAULT
	}

	public get currentState(): CharacterState {
		return this._currentState
	}

	public switchState(state: CharacterState) {
		if (state === this._currentState) return

		if (
			(this._currentState === CharacterState.DEFAULT &&
				state === CharacterState.ATTACK) ||
			(this._currentState === CharacterState.ATTACK &&
				state === CharacterState.DEFAULT)
		)
			throw new Error(
				`CharacterStateMachine -> switchState(): Character can't switch from state ${this._currentState} to state ${state}`
			)

		this._currentState = state
	}
}
