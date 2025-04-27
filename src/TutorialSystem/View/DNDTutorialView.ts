import { DNDTutorialStep } from '../Steps/DND/DNDTutorialStep.ts'
import { DNDUserActionType } from '../Steps/DND/DNDUserActionType.ts'
import DNDTutorialVM from '../ViewModel/DNDTutorialVM.ts'
import TutorialView from './TutorialView.ts'

export default class DNDTutorialView extends TutorialView {
	constructor(viewModel: DNDTutorialVM) {
		super()

		this._viewModel = viewModel

		// ViewModel Events Subscriptions
		;(this._viewModel as DNDTutorialVM).currentStep$.subscribe(
			(stepData: DNDTutorialStep) => {
				// TODO: 1) Запретить все доступные действия
				// TODO: 2) Разрешить перечисленные в allowedActions действия
				// TODO: 3) Вывести все сообщения в MessageBox
			}
		)
	}

	// TODO: реализовать
	private enableActions(allowedActions: DNDUserActionType[]): void {}
	private disableActions(): void {}
}
