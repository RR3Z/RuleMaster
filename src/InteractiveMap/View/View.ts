import { MapVisualData } from '../_Types/Map.ts'
import ViewModel from '../ViewModel/ViewModel.ts'
import VisualEngine from './Visual/VisualEngine.ts'

export default class View {
	private _viewModel: ViewModel
	private _visualEngine: VisualEngine

	constructor(viewModel: ViewModel) {
		this._viewModel = viewModel
		this._visualEngine = new VisualEngine()
	}

	public async init(data: MapVisualData): Promise<void> {
		await this._visualEngine.init()
		this._visualEngine.initScene(data)
	}
}
