import { Observable, Subject } from 'rxjs'
import { Position } from '../InteractiveMap/_Types/Position.ts'
import Character from '../InteractiveMap/Entities/Characters/Character.ts'
import { areObjectsDataEqual } from '../Utils/ObjectUtils.ts'
import { DNDTutorialStep } from './Steps/DND/DNDTutorialStep.ts'
import { DNDUserActionType } from './Steps/DND/DNDUserActionType.ts'
import { TutorialStep } from './Steps/TutorialStep.ts'
import { UserAction } from './Steps/UserAction.ts'

export default class TutorialModel {
	// Fields
	private _steps: TutorialStep[]
	private _currentStepIndex: number

	// Event
	private readonly _currentStep$: Subject<TutorialStep>
	private readonly _onTutorialEnd$: Subject<string[]>

	constructor() {
		this._steps = []
		this._currentStepIndex = 0
		this._currentStep$ = new Subject<TutorialStep>()
		this._onTutorialEnd$ = new Subject<string[]>()
	}

	public get currentStep$(): Observable<TutorialStep> {
		return this._currentStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<string[]> {
		return this._onTutorialEnd$.asObservable()
	}

	public init(steps: TutorialStep[], player: Character): void {
		this._steps = steps

		player.pos$.subscribe((pos: Position) => {
			if (
				(this._steps[this._currentStepIndex] as DNDTutorialStep).expectedAction
					.type === DNDUserActionType.MOVE
			)
				this.nextStep()
		})

		this.nextStep()
	}

	public nextStep(): void {
		this._currentStepIndex++
		if (this._currentStepIndex >= this._steps.length) {
			this._onTutorialEnd$.next(['Вы завершили урок!'])
			return
		}

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

	public dispose(): void {
		this._currentStep$.complete()
		this._onTutorialEnd$.complete()
	}
}
