import ActionsManager from '../ActionsManager/ActionsManager'
import Character from '../Entities/Character/Character'
import { Game } from '../Types/Game'
import InteractiveMapComponentsFabric, {
	InteractiveMapComponents,
} from './InteractiveMapComponentsFabric'
import InteractiveMapModel from './Model/InteractiveMapModel'
import InteractiveMapPresenter from './Presenter/InteractiveMapPresenter'
import { InteractiveMapData } from './Types/InteractiveMapData'
import InteractiveMapView from './View/InteractiveMapView'

export default class InteractiveMap {
	private _model: InteractiveMapModel
	private _presenter: InteractiveMapPresenter
	private _view: InteractiveMapView

	constructor(game: Game, data: InteractiveMapData) {
		const components: InteractiveMapComponents =
			InteractiveMapComponentsFabric.create(game, data)
		this._view = components.view
		this._presenter = components.presenter
		this._model = components.model
	}

	public async init(
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await this._view.initialize(
			this._model.player,
			this._model.enemies,
			playerVisualFilePath,
			enemiesVisualFilePath
		)
	}

	public get model(): InteractiveMapModel {
		return this._model
	}

	public get view(): InteractiveMapView {
		return this._view
	}

	public get player(): Character {
		return this._model.player
	}

	public get enemies(): Character[] {
		return this._model.enemies
	}

	public get canvas(): HTMLCanvasElement {
		return this._view.visualEngine.canvas
	}

	public get actionsManager(): ActionsManager {
		return this._model.actionsManager
	}

	public get charactersVisualFilePaths(): Map<string, string> {
		return this._view.visualEngine.charactersVisualFilePaths
	}
}
