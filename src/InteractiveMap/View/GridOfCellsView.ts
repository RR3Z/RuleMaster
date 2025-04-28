import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import Grid from '../Grid/Grid'
import GridOfCellsVM from '../ViewModel/GridOfCellsVM'
import GridOfCellsVisualEngine from '../VisualEngine/GridOfCellsVisualEngine'
import MapView from './MapView'

export type GridOfCellsViewParams = {
	data: GridOfCellsVisualData
	viewModel: GridOfCellsVM
	grid: Grid
}

export default class GridOfCellsView extends MapView {
	constructor(params: GridOfCellsViewParams) {
		super(params.viewModel)
		this._visualEngine = new GridOfCellsVisualEngine(params.data, params.grid)
	}
}
