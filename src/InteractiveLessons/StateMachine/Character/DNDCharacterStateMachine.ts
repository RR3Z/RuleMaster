import { DNDCharacterState } from './DNDCharacterState'

export default class DNDCharacterStateMachine {
	private _currentState: DNDCharacterState

	constructor(startState?: DNDCharacterState) {
		startState
			? (this._currentState = startState)
			: (this._currentState = DNDCharacterState.ADVENTURE)
	}

	public get currentState(): DNDCharacterState {
		return this._currentState
	}

	public changeState(state: DNDCharacterState): void {
		this._currentState = state
	}
}
