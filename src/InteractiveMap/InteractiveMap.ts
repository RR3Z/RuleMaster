import { GameType } from './_Types/GameType'
import { MapData } from './_Types/MapData'
import { MapType } from './_Types/MapType'
import InteractiveMapComponentsFabric from './InteractiveMapComponentsFabric'
import MapModel from './Model/MapModel'
import MapView from './View/MapView'
import MapVM from './ViewModel/MapVM'

export default class InteractiveMap {
	private _view: MapView
	private _viewModel: MapVM
	private _model: MapModel

	constructor(gameType: GameType, mapType: MapType, data: MapData) {
		const components = InteractiveMapComponentsFabric.create(
			gameType,
			mapType,
			data
		)
		this._view = components.view
		this._viewModel = components.viewModel
		this._model = components.model
	}

	public async init(): Promise<void> {
		await this._view.init()
	}
}
