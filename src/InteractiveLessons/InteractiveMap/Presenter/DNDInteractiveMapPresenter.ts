import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { Position } from '@/InteractiveLessons/Types/Position'
import DNDInteractiveMapModel from '../Model/DNDInteractiveMapModel'
import InteractiveMapPresenter from './InteractiveMapPresenter'

export default class DNDInteractiveMapPresenter extends InteractiveMapPresenter {
	constructor(model: DNDInteractiveMapModel) {
		super()

		this._model = model

		this._model.player.pos$.subscribe((pos: Position) =>
			this.onModelPlayerPosChange(pos)
		)
	}

	public onViewPlayerPosChange(pos: Position): void {
		const actionsManager = this._model.actionsManager as DNDActionsManager
		actionsManager.perform(
			this._model.player as DNDCharacter,
			actionsManager.moveAction,
			pos
		)
	}

	protected onModelPlayerPosChange(pos: Position): void {
		this._onPlayerPosChange$.next(pos)
	}
}
