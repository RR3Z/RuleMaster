import { Position } from '@/InteractiveLessons/Types/Position'
import GridOfCells from '../Logic/Grid/GridOfCells'
import DNDInteractiveMapPresenter from '../Presenter/DNDInteractiveMapPresenter'
import GridOfCellsVisualEngine from '../Visual/Engine/GridOfCellsVisualEngine'
import { GridOfCellsVisualData } from '../Visual/Grid/GridOfCellsVisualData'
import InteractiveMapView from './InteractiveMapView'

export type DNDInteractiveMapViewParams = {
	data: GridOfCellsVisualData
	presenter: DNDInteractiveMapPresenter
	grid: GridOfCells
}

export default class DefaultDNDInteractiveMapView extends InteractiveMapView {
	constructor(params: DNDInteractiveMapViewParams) {
		super()

		this._presenter = params.presenter
		this._visualEngine = new GridOfCellsVisualEngine(params.data, params.grid)
	}

	public override async initialize(
		playerPos: Position,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await super.initialize(
			playerPos,
			playerVisualFilePath,
			enemiesVisualFilePath
		)

		// Player Events
		;(
			this._presenter as DNDInteractiveMapPresenter
		).onPlayerPosChange$.subscribe((pos: Position) => {
			this.onPresenterPlayerPosChange(pos)
		})
		;(this._visualEngine as GridOfCellsVisualEngine).player.pos$.subscribe(
			(pos: Position) => {
				;(this._presenter as DNDInteractiveMapPresenter).onViewPlayerPosChange(
					pos
				)
			}
		)
	}

	protected override onPresenterPlayerPosChange(pos: Position): void {
		;(this._visualEngine as GridOfCellsVisualEngine).player.updatePosition(pos)
	}
}
