import { Position } from '../_Types/Position'
import DNDActionsManager from '../ActionsManager/DNDActionsManager'
import DNDCharacter from '../Entities/Characters/DNDCharacter'
import DNDMapModel from '../Model/DNDMapModel'
import MapVM from './MapVM'

export default class DNDMapVM extends MapVM {
	constructor(model: DNDMapModel) {
		super()

		this._model = model

		this._model.player.pos$.subscribe((pos: Position) =>
			this.onModelPlayerPosChange(pos)
		)
	}

	public onViewPlayerPosChange(pos: Position): void {
		const actionsManager = this._model.actionsManager as DNDActionsManager
		actionsManager.perform(
			actionsManager.moveAction,
			this._model.player as DNDCharacter,
			pos
		)
	}

	protected onModelPlayerPosChange(pos: Position): void {
		this._onPlayerPosChange$.next(pos)
	}
}
