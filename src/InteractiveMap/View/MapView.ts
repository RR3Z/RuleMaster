import MapVM from '../ViewModel/MapVM'
import MapVisualEngine from '../VisualEngine/MapVisualEngine'

export default class MapView {
	protected _viewModel: MapVM
	protected _visualEngine!: MapVisualEngine

	constructor(viewModel: MapVM) {
		this._viewModel = viewModel
	}

	public async init(): Promise<void> {
		await this._visualEngine.init()
	}
}
