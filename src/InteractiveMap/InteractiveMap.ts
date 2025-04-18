import { MapData } from './_Types/Map.ts'
import GameModel from './Model/GameModel.ts'
import Utils from './Utils.ts'
import View from './View/View.ts'
import ViewModel from './ViewModel/ViewModel.ts'

export default class InteractiveMap {
	private _viewModel!: ViewModel
	private _model!: GameModel
	private _view!: View

	constructor() {}

	public async init(levelFilePath: string): Promise<void> {
		const mapData: MapData = await Utils.loadFileData(levelFilePath)

		this._model = new GameModel(mapData.logic)
		this._viewModel = new ViewModel(this._model)
		this._view = new View(this._viewModel)

		await this._view.init(mapData.visual.grid)
	}
}
