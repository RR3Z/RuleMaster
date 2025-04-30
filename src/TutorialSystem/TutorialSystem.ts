import { Game } from '../InteractiveMap/_Types/GameType.ts'
import TutorialSystemComponentsFabric from './Fabrics/TutorialSystemComponentsFabric.ts'
import { Scenario } from './Scenario.ts'
import TutorialModel from './TutorialModel.ts'
import TutorialView from './View/TutorialView.ts'
import TutorialVM from './ViewModel/TutorialVM.ts'

export default class TutorialSystem {
	private _model: TutorialModel
	private _viewModel: TutorialVM
	private _view: TutorialView

	constructor(game: Game) {
		this._model = new TutorialModel()
		this._viewModel = TutorialSystemComponentsFabric.createViewModel(
			game,
			this._model
		)
		this._view = TutorialSystemComponentsFabric.createView(
			game,
			this._viewModel
		)
	}

	public start(data: Scenario): void {
		this._model.init(data.steps)
	}
}
