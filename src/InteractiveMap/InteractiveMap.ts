import { Game } from './_Types/GameType'
import { MapData } from './_Types/MapData'
import InteractiveMapComponentsFabric from './InteractiveMapComponentsFabric'
import MapModel from './Model/MapModel'
import MapView from './View/MapView'
import MapVM from './ViewModel/MapVM'

export default class InteractiveMap {
	private _view: MapView
	private _viewModel: MapVM
	private _model: MapModel
	private _game: Game

	constructor(game: Game, data: MapData) {
		const components = InteractiveMapComponentsFabric.create(game, data)
		this._view = components.view
		this._viewModel = components.viewModel
		this._model = components.model
		this._game = game
	}

	public async init(): Promise<void> {
		await this._view.init()
	}
}
