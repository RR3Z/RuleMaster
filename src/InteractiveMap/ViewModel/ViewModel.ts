import GameModel from '../Model/GameModel.ts'
import { CharacterPosition } from '../View/Visual/Characters/CharacterToken.ts'

export default class ViewModel {
	private _model: GameModel

	constructor(model: GameModel) {
		this._model = model
	}

	// Handlers
	public onCharacterPositionChanged(data: CharacterPosition): void {
		this._model.moveCharacterTo(data.character, data.pos)
	}
}
