import { Observable, Subject } from 'rxjs'
import { Position } from '../_Types/Position'
import MapModel from '../Model/MapModel'

export default abstract class MapVM {
	protected _model!: MapModel
	protected readonly _onPlayerPosChange$!: Subject<Position>

	constructor() {
		this._onPlayerPosChange$ = new Subject<Position>()

		this._model.player.pos$.subscribe((pos: Position) =>
			this.onModelPlayerPosChange(pos)
		)
	}

	public get onPlayerPosChange$(): Observable<Position> {
		return this._onPlayerPosChange$.asObservable()
	}

	public abstract onViewPlayerPosChange(pos: Position): void
	protected abstract onModelPlayerPosChange(pos: Position): void
}
