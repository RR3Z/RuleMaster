import { Observable, Subject } from 'rxjs'
import { Position } from '../../_Types/Map.ts'
import { TriggerData } from '../../_Types/Triggers.ts'

export default class Trigger {
	private readonly _onTriggerEnterEvent$
	private _pos: Position
	private _tutorialStepIndex: number
	private _isEnabled: boolean

	constructor(data: TriggerData) {
		this._pos = data.cellPos
		this._tutorialStepIndex = data.tutorialStepIndex
		this._onTriggerEnterEvent$ = new Subject<number>()
		this._isEnabled = true
	}

	public get pos(): Readonly<Position> {
		return this._pos
	}

	public get onTriggerEnterEvent$(): Observable<number> {
		return this._onTriggerEnterEvent$.asObservable()
	}

	public get tutorialStepIndex(): number {
		return this._tutorialStepIndex
	}

	public switchState(): void {
		this._isEnabled = !this._isEnabled
	}

	public onEnter(): void {
		this._onTriggerEnterEvent$.next(this._tutorialStepIndex)
	}
}
