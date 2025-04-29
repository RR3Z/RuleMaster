import { GameType } from './_Types/GameType'
import { MapData } from './_Types/MapData'
import { MapType } from './_Types/MapType'
import GridOfCellsModel from './Model/GridOfCellsModel'
import MapModel from './Model/MapModel'
import GridOfCellsView from './View/GridOfCellsView'
import MapView from './View/MapView'
import GridOfCellsVM from './ViewModel/GridOfCellsVM'
import MapVM from './ViewModel/MapVM'

export type InteractiveMapComponents = {
	view: MapView
	model: MapModel
	viewModel: MapVM
}

export default class InteractiveMapComponentsFabric {
	public static create(
		gameType: GameType,
		mapType: MapType,
		mapData: MapData
	): InteractiveMapComponents {
		switch (mapType) {
			case MapType.GRID_OF_CELLS:
				const model = new GridOfCellsModel(gameType, mapData.logic)
				const viewModel = new GridOfCellsVM(model)
				const view = new GridOfCellsView({
					data: mapData.visual,
					viewModel: viewModel,
					grid: model.grid,
				})
				return { model: model, viewModel: viewModel, view: view }
			default:
				throw new Error(
					'InteractiveMapComponentsFabric -> create(): Unknown MapType'
				)
		}
	}
}
