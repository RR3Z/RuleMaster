import { Observable, Subject } from 'rxjs'
import TutorialSystemModel from './Models/TutorialSystemModel'
import { DNDTutorialStep } from './Types/DND/DNDTutorialStep'
import { TutorialStep } from './Types/TutorialStep'

export default class TutorialSystemPresenter {
	protected _model: TutorialSystemModel
	protected _onNextStep$: Subject<TutorialStep>
	protected _onTutorialEnd$: Subject<string[]>

	constructor(model: TutorialSystemModel) {
		this._model = model

		this._onNextStep$ = new Subject<TutorialStep>()
		this._onTutorialEnd$ = new Subject<string[]>()

		this._model.onNextStep$.subscribe((stepData: TutorialStep) => {
			this._onNextStep$.next(stepData as DNDTutorialStep)
		})
		this._model.onTutorialEnd$.subscribe((messages: string[]) =>
			this._onTutorialEnd$.next(messages)
		)
	}

	public get onNextStep$(): Observable<TutorialStep> {
		return this._onNextStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<string[]> {
		return this._onTutorialEnd$.asObservable()
	}
}
