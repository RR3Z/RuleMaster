import MapVM from '../ViewModel/MapVM'
import MapVisualEngine from '../VisualEngine/MapVisualEngine'

export default class MapView {
	protected _viewModel!: MapVM
	protected _visualEngine!: MapVisualEngine

	public async init(): Promise<void> {
		await this._visualEngine.init()
	}
}
