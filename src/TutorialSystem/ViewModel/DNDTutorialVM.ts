import { Subject } from 'rxjs'
import { DNDTutorialStep } from '../Steps/DND/DNDTutorialStep.ts'
import { TutorialStep } from '../Steps/TutorialStep.ts'
import TutorialModel from '../TutorialModel.ts'
import TutorialVM from './TutorialVM.ts'

export default class DNDTutorialVM extends TutorialVM {
	constructor(model: TutorialModel) {
		super()

		this._model = model
		this._currentStep$ = new Subject<DNDTutorialStep>()

		// Model Events Subscriptions
		this._model.currentStep$.subscribe((stepData: TutorialStep) => {
			this._currentStep$.next(stepData as DNDTutorialStep)
		})
		this._model.onTutorialEnd$.subscribe((onEndMessages: string[]) =>
			this._onTutorialEnd$.next(onEndMessages)
		)
	}

	public dispose(): void {
		this._currentStep$.complete()
	}
}
