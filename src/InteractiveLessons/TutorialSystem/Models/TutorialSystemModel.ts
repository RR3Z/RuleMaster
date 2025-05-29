import Logger from '@/InteractiveLessons/Logger/Logger'
import { Observable, Subject } from 'rxjs'
import { TutorialStep } from '../Types/TutorialStep'

export default abstract class TutorialSystemModel {
	protected _steps: TutorialStep[]
	protected _currentStepIndex: number
	protected _logger!: Logger

	protected readonly _onNextStep$: Subject<TutorialStep>
	protected readonly _onTutorialEnd$: Subject<string[]>
	protected readonly _onWrongAction$: Subject<string>

	constructor() {
		this._steps = []
		this._currentStepIndex = -1
		this._onNextStep$ = new Subject<TutorialStep>()
		this._onTutorialEnd$ = new Subject<string[]>()
		this._onWrongAction$ = new Subject<string>()
	}

	public get onNextStep$(): Observable<TutorialStep> {
		return this._onNextStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<string[]> {
		return this._onTutorialEnd$.asObservable()
	}

	public get onWrongAction$(): Observable<string> {
		return this._onWrongAction$.asObservable()
	}

	public get currentStep(): TutorialStep {
		return this._steps[this._currentStepIndex]
	}

	protected nextStep(): void {
		this._currentStepIndex++
		if (this._currentStepIndex >= this._steps.length) {
			this._onTutorialEnd$.next(['Поздравляем! Урок успешно завершен.'])
			return
		}

		this._onNextStep$.next(this._steps[this._currentStepIndex])
	}

	public abstract init(
		steps: TutorialStep[],
		logger: Logger,
		...args: any
	): void
}
