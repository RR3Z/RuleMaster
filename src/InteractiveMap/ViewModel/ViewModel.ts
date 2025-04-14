import GameModel from '../Model/GameModel.ts'

export default class ViewModel {
	private _model: GameModel

	constructor(model: GameModel) {
		this._model = model
	}
}
