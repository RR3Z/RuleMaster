import { Position } from '@/InteractiveLessons/Types/Position'
import { Observable, Subject } from 'rxjs'
import InteractiveMapModel from '../Model/InteractiveMapModel'

export default abstract class InteractiveMapPresenter {
	protected _model!: InteractiveMapModel
	protected readonly _onPlayerPosChange$!: Subject<Position>

	constructor() {
		this._onPlayerPosChange$ = new Subject<Position>()
	}

	public get onPlayerPosChange$(): Observable<Position> {
		return this._onPlayerPosChange$.asObservable()
	}

	public abstract onViewPlayerPosChange(pos: Position): void
	protected abstract onModelPlayerPosChange(pos: Position): void
}
