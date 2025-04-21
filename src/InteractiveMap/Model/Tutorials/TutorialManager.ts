import { BehaviorSubject, Observable } from 'rxjs'
import {
	MessageBoxData,
	TutorialData,
	TutorialStepData,
} from '../../_Types/Tutorials.ts'
import Trigger from '../Triggers/Trigger.ts'

export default class TutorialManager {
	private _steps: TutorialStepData[]
	private _stepIndex: number
	private readonly _messageBoxData$: BehaviorSubject<MessageBoxData>

	constructor(data: TutorialData, triggers: Set<Trigger>) {
		this._steps = data.steps
		this._stepIndex = 0
		this._messageBoxData$ = new BehaviorSubject<MessageBoxData>(undefined)

		triggers.forEach((trigger: Trigger) => {
			trigger.onTriggerEnterEvent$.subscribe((tutorialStepIndex: number) => {
				if (this._stepIndex !== tutorialStepIndex)
					throw new Error(
						`TutorialManager -> ON TRIGGER ENTER -> Incorrect tutorialStepIndex (wrong trigger tutorialStepIndex or sequence of activations).\nTrigger: ${trigger}\nCurrent Step Index:${this._stepIndex}`
					)

				this.show()
			})
		})
	}

	public messageBoxData$(): Observable<MessageBoxData> {
		return this._messageBoxData$.asObservable()
	}

	public next(): void {
		if (!this._steps[this._stepIndex].needNext)
			throw new Error(
				`TutorialManager -> next(): Call method when prev step needNext === false ${
					this._steps[this._stepIndex]
				}`
			)
		this._stepIndex++
		this._messageBoxData$.next(this._steps[this._stepIndex])
	}

	private show(): void {
		const data = this._steps[this._stepIndex]
		this._messageBoxData$.next(data)
		if (!data.needNext) this._stepIndex++
	}
}
