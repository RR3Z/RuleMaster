import { Game } from '../Types/Game'
import DNDInteractiveMapModel from './Model/DNDInteractiveMapModel'
import InteractiveMapModel from './Model/InteractiveMapModel'
import DNDInteractiveMapPresenter from './Presenter/DNDInteractiveMapPresenter'
import InteractiveMapPresenter from './Presenter/InteractiveMapPresenter'
import { DNDInteractiveMapData } from './Types/DNDInteractiveMapData'
import { InteractiveMapData } from './Types/InteractiveMapData'
import DefaultDNDInteractiveMapView from './View/DefaultDNDInteractiveMapView'
import InteractiveMapView from './View/InteractiveMapView'

export type InteractiveMapComponents = {
	view: InteractiveMapView
	model: InteractiveMapModel
	presenter: InteractiveMapPresenter
}

export default class InteractiveMapComponentsFabric {
	public static create(
		game: Game,
		mapData: InteractiveMapData
	): InteractiveMapComponents {
		switch (game) {
			case Game.DND:
				const data = mapData as DNDInteractiveMapData
				const model = new DNDInteractiveMapModel(data.logic)
				const presenter = new DNDInteractiveMapPresenter(model)
				const view = new DefaultDNDInteractiveMapView({
					data: data.visual,
					presenter: presenter,
					grid: model.grid,
				})
				return { model: model, presenter: presenter, view: view }
			default:
				throw new Error(
					'InteractiveMapComponentsFabric -> create(): Unknown Game'
				)
		}
	}
}
