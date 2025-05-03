import { Position } from '../_Types/Position'
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
		this._model.moveCharacterTo(this._model.player as DNDCharacter, pos)
	}

	protected onModelPlayerPosChange(pos: Position): void {
		this._onPlayerPosChange$.next(pos)
	}
}
