import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { CharacterPosition } from '../_Types/Characters.ts'
import { Position } from '../_Types/Map.ts'
import { MessageBoxData } from '../_Types/Tutorials.ts'
import GameModel from '../Model/GameModel.ts'

export default class ViewModel {
	private _model: GameModel

	public readonly playerPosition$: BehaviorSubject<Position>
	private readonly _messageBoxData$: Subject<MessageBoxData>

	constructor(model: GameModel, playerPos: Position) {
		this._model = model
		this.playerPosition$ = new BehaviorSubject(playerPos)
		this._messageBoxData$ = new Subject<MessageBoxData>()

		// Listen Model
		this._model.player.position.subscribe((pos: Position) =>
			this.playerPosition$.next(pos)
		)
		this._model.tutorialManager.messageBoxData$.subscribe(
			(data: MessageBoxData) => {
				this._messageBoxData$.next(data)
			}
		)
	}

	public get messageBoxData$(): Observable<MessageBoxData> {
		return this._messageBoxData$.asObservable()
	}

	public onCharacterPositionChanged(data: CharacterPosition): void {
		this._model.moveCharacterTo(data.character, data.pos)
	}

	public onMessageBoxNextButtonClicked(): void {
		this._model.tutorialManager.next()
	}
}
