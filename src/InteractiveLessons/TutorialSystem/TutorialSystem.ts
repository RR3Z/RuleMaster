import { Observable } from 'rxjs'
import Logger from '../Logger/Logger'
import { Game } from '../Types/Game'
import TutorialSystemComponentsFabric from './Fabrics/TutorialSystemComponentsFabric'
import TutorialSystemModel from './Models/TutorialSystemModel'
import TutorialSystemPresenter from './TutorialSystemPresenter'
import { DNDTutorialStep } from './Types/DND/DNDTutorialStep'
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

	public init(steps: TutorialStep[], logger: Logger, ...args: any): void {
		this._model.init(steps, logger, ...args)
	}

	public get currentStep(): Readonly<TutorialStep> {
		return this._model.currentStep
	}

	public get onNextStep$(): Observable<DNDTutorialStep> {
		return this._model.onNextStep$
	}

	public get onWrongAction$(): Observable<string> {
		return this._model.onWrongAction$
	}
}
