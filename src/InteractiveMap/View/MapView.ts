import { Position } from '../_Types/Position'
import MapVM from '../ViewModel/MapVM'
import MapVisualEngine from '../VisualEngine/MapVisualEngine'

export default abstract class MapView {
	protected _viewModel!: MapVM
	protected _visualEngine!: MapVisualEngine

	public async init(): Promise<void> {
		await this._visualEngine.init()
	}

	protected abstract onViewModelPlayerPosChange(pos: Position): void
}
