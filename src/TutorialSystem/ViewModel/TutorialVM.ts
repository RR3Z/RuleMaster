import { Observable, Subject } from 'rxjs'
import { TutorialStep } from '../Steps/TutorialStep.ts'
import TutorialModel from '../TutorialModel.ts'

export default abstract class TutorialVM {
	protected _model!: TutorialModel
	protected _currentStep$!: Subject<TutorialStep>
	protected _onTutorialEnd$!: Subject<string[]>

	public get currentStep$(): Observable<TutorialStep> {
		return this._currentStep$.asObservable()
	}

	public get onTutorialEnd$(): Observable<string[]> {
		return this._onTutorialEnd$.asObservable()
	}
}
