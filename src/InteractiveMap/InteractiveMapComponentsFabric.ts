import { DNDMapData } from './_Types/DNDMapData'
import { Game } from './_Types/GameType'
import { MapData } from './_Types/MapData'
import DNDMapModel from './Model/DNDMapModel'
import MapModel from './Model/MapModel'
import DefaultDNDMapView from './View/DefaultDNDMapView'
import MapView from './View/MapView'
import DNDMapVM from './ViewModel/DNDMapVM'
import MapVM from './ViewModel/MapVM'

export type InteractiveMapComponents = {
	view: MapView
	model: MapModel
	viewModel: MapVM
}

export default class InteractiveMapComponentsFabric {
	public static create(game: Game, mapData: MapData): InteractiveMapComponents {
		switch (game) {
			case Game.DND:
				const data = mapData as DNDMapData
				const model = new DNDMapModel(data.logic)
				const viewModel = new DNDMapVM(model)
				const view = new DefaultDNDMapView({
					data: data.visual,
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
