import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import GridOfCells from '../Grid/GridOfCells'
import DNDMapVM from '../ViewModel/DNDMapVM'
import GridOfCellsVisualEngine from '../VisualEngine/GridOfCellsVisualEngine'
import MapView from './MapView'

export type DNDMapViewParams = {
	data: GridOfCellsVisualData
	viewModel: DNDMapVM
	grid: GridOfCells
}

export default class DefaultDNDMapView extends MapView {
	constructor(params: DNDMapViewParams) {
		super()

		this._viewModel = params.viewModel
		this._visualEngine = new GridOfCellsVisualEngine(params.data, params.grid)
	}
}
