import { Observable, Subject } from 'rxjs'
import { TutorialStep } from '../Steps/TutorialStep.ts'
import TutorialModel from '../TutorialModel.ts'
import TutorialVM from './TutorialVM.ts'

export default class DNDTutorialVM extends TutorialVM {
	private _currentStep$ = new Subject<TutorialStep>()

	constructor(model: TutorialModel) {
		super()

		this._model = model
		this._currentStep$ = new Subject<TutorialStep>()

		// Model Events Subscriptions
		this._model.currentStep$.subscribe((stepData: TutorialStep) => {
			this._currentStep$.next(stepData)
		})
	}

	public get currentStep$(): Observable<TutorialStep> {
		return this._currentStep$.asObservable()
	}

	public dispose(): void {
		this._currentStep$.complete()
	}
}
