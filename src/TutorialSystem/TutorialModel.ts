import { Observable, Subject } from 'rxjs'
import { areObjectsDataEqual } from '../Utils/ObjectUtils.ts'
import { TutorialStep } from './Steps/TutorialStep.ts'
import { UserAction } from './Steps/UserAction.ts'

export default class TutorialModel {
	// Fields
	private _steps: TutorialStep[]
	private _currentStepIndex: number

	// Event
	private readonly _currentStep$: Subject<TutorialStep>
	private readonly _onTutorialEnd$: Subject<void>

	constructor() {
		this._steps = []
		this._currentStepIndex = -1
		this._currentStep$ = new Subject<TutorialStep>()
		this._onTutorialEnd$ = new Subject<void>()
	}

	public get currentStep$(): Observable<TutorialStep> {
		return this._currentStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<void> {
		return this._onTutorialEnd$.asObservable()
	}

	public init(steps: TutorialStep[]): void {
		this._steps = steps
	}

	public nextStep(): void {
		this._currentStepIndex++
		if (this._currentStepIndex >= this._steps.length)
			this._onTutorialEnd$.next()

		this._currentStep$.next(this._steps[this._currentStepIndex])
	}

	public checkUserAction(userAction: UserAction): boolean {
		const expectedAction = this._steps[this._currentStepIndex].expectedAction

		// Проверка, совпадает ли действие пользователя с ожидаемым (по типу)
		if (expectedAction.type !== userAction.type) return false

		// Проверка данных
		if (!areObjectsDataEqual(expectedAction.params, userAction.params))
			return false

		return true
	}
}
