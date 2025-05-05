import { GridOfCellsVisualData } from '../_Types/GridOfCellsVisualData'
import { Position } from '../_Types/Position'
import AreaHighlighter from '../AreaHighlighter/AreaHighlighter'
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
	private _areaHighlighter!: AreaHighlighter

	constructor(params: DNDMapViewParams) {
		super()

		this._viewModel = params.viewModel
		this._visualEngine = new GridOfCellsVisualEngine(params.data, params.grid)
		this._areaHighlighter = new AreaHighlighter()
	}

	public override async init(): Promise<void> {
		await super.init()

		this._areaHighlighter.init(
			(this._visualEngine as GridOfCellsVisualEngine).gridOfCellsVisual,
			(this._visualEngine as GridOfCellsVisualEngine).player.pos
		)

		// Player Events
		;(this._viewModel as DNDMapVM).onPlayerPosChange$.subscribe(
			(pos: Position) => {
				this.onViewModelPlayerPosChange(pos)
				this._areaHighlighter.updatePlayerPosition(pos)
			}
		)
		;(this._visualEngine as GridOfCellsVisualEngine).player.pos$.subscribe(
			(pos: Position) => {
				;(this._viewModel as DNDMapVM).onViewPlayerPosChange(pos)
			}
		)
	}

	protected override onViewModelPlayerPosChange(pos: Position): void {
		;(this._visualEngine as GridOfCellsVisualEngine).player.updatePosition(pos)
	}
}
