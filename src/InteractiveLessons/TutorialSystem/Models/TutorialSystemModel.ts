import Character from '@/InteractiveLessons/Entities/Character/Character'
import { Observable, Subject } from 'rxjs'
import { TutorialStep } from '../Types/TutorialStep'

export default abstract class TutorialSystemModel {
	protected _steps: TutorialStep[]
	protected _currentStepIndex: number

	protected readonly _onNextStep$: Subject<TutorialStep>
	protected readonly _onTutorialEnd$: Subject<string[]>

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

	protected nextStep(): void {
		this._currentStepIndex++
		if (this._currentStepIndex >= this._steps.length) {
			this._onTutorialEnd$.next(['Вы завершили урок!'])
			return
		}

		this._onNextStep$.next(this._steps[this._currentStepIndex])
	}

	public abstract init(steps: TutorialStep[], player: Character): void
}
