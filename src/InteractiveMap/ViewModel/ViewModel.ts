import { BehaviorSubject } from 'rxjs'
import { Position } from '../_Types/Map.ts'
import GameModel from '../Model/GameModel.ts'
import { CharacterPosition } from '../View/Visual/Characters/CharacterToken.ts'

export default class ViewModel {
	private _model: GameModel

	public readonly playerPosition$: BehaviorSubject<Position>

	constructor(model: GameModel, playerPos: Position) {
		this._model = model
		this.playerPosition$ = new BehaviorSubject(playerPos)

		// Listen Model
		this._model.player.position.subscribe((pos: Position) =>
			this.onModelCharacterPositionChanged(pos)
		)
	}

	public onModelCharacterPositionChanged(pos: Position): void {
		this.playerPosition$.next(pos)
	}

	public onCharacterPositionChanged(data: CharacterPosition): void {
		this._model.moveCharacterTo(data.character, data.pos)
	}
}
