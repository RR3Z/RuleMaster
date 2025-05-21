import { Observable, Subject } from 'rxjs'
import Character from '../Entities/Character/Character'
import { TutorialStep } from './Types/TutorialStep'
import { UserAction } from './Types/UserAction'

export default class TutorialSystemModel {
	private _steps: TutorialStep[]
	private _currentStepIndex: number

	private readonly _onNextStep$: Subject<TutorialStep>
	private readonly _onTutorialEnd$: Subject<string[]>

	constructor() {
		this._steps = []
		this._currentStepIndex = 0
		this._onNextStep$ = new Subject<TutorialStep>()
		this._onTutorialEnd$ = new Subject<string[]>()
	}

	public get onNextStep$(): Observable<TutorialStep> {
		return this._onNextStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<string[]> {
		return this._onTutorialEnd$.asObservable()
	}

	// TODO:
	public init(steps: TutorialStep[], player: Character): void {
		this._steps = steps

		// TODO: Слушать действия игрока и проверять, что они верные
	}

	// TODO:
	private nextStep(): void {
		this._currentStepIndex++
		if (this._currentStepIndex >= this._steps.length) {
			this._onTutorialEnd$.next(['Вы завершили урок!'])
			return
		}

		this._onNextStep$.next(this._steps[this._currentStepIndex])
	}

	// TODO:
	private checkUserAction(userAction: UserAction): boolean {
		return true
	}
}
