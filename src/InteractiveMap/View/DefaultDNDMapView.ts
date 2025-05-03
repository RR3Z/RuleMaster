import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import { Position } from '../_Types/Position'
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

	public override async init(): Promise<void> {
		await super.init()

		// Player Events
		;(this._viewModel as DNDMapVM).onPlayerPosChange$.subscribe(
			(pos: Position) => this.onViewModelPlayerPosChange(pos)
		)
		;(this._visualEngine as GridOfCellsVisualEngine).player.pos$.subscribe(
			(pos: Position) =>
				(this._viewModel as DNDMapVM).onViewPlayerPosChange(pos)
		)
	}

	protected override onViewModelPlayerPosChange(pos: Position): void {
		;(this._visualEngine as GridOfCellsVisualEngine).player.updatePosition(pos)
	}
}
