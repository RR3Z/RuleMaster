import Character from '../Entities/Character/Character'
import { Game } from '../Types/Game'
import TutorialSystemComponentsFabric from './Fabrics/TutorialSystemComponentsFabric'
import TutorialSystemModel from './Models/TutorialSystemModel'
import TutorialSystemPresenter from './TutorialSystemPresenter'
import { TutorialStep } from './Types/TutorialStep'
import TutorialSystemView from './Views/TutorialSystemView'

export default class TutorialSystem {
	private _model: TutorialSystemModel
	private _presenter: TutorialSystemPresenter
	private _view: TutorialSystemView

	constructor(game: Game) {
		this._model = TutorialSystemComponentsFabric.createModel(game)
		this._presenter = new TutorialSystemPresenter(this._model)
		this._view = TutorialSystemComponentsFabric.createView(
			game,
			this._presenter
		)
	}

	public init(steps: TutorialStep[], player: Character): void {
		this._model.init(steps, player)
	}
}
