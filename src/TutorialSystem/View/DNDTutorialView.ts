import { DNDTutorialStep } from '../Steps/DND/DNDTutorialStep.ts'
import { DNDUserActionType } from '../Steps/DND/DNDUserActionType.ts'
import DNDTutorialVM from '../ViewModel/DNDTutorialVM.ts'
import ActionsPanel from './Components/ActionsPanel.ts'
import InteractiveMapCanvas from './Components/InteractiveMapCanvas.ts'
import MessageBox from './Components/MessageBox.ts'
import RightSideMenu from './Components/RightSideMenu.ts'
import TutorialView from './TutorialView.ts'

export default class DNDTutorialView extends TutorialView {
	constructor(viewModel: DNDTutorialVM) {
		super()

		this._viewModel = viewModel

		this._interactiveMapCanvas = new InteractiveMapCanvas()
		this._actionsPanel = new ActionsPanel()
		this._messageBox = new MessageBox()
		this._rightSideMenu = new RightSideMenu()

		// ViewModel Events Subscriptions
		;(this._viewModel as DNDTutorialVM).currentStep$.subscribe(
			(stepData: DNDTutorialStep) => {
				this.disableAllActions()
				this.enableActions(stepData.allowedActions)
				this._messageBox.showMessages(stepData.messages)
			}
		)
	}

	protected enableActions(allowedActions: DNDUserActionType[]): void {
		for (let action of allowedActions) {
			switch (action) {
				case DNDUserActionType.MOVE:
					this._interactiveMapCanvas.enable()
					console.log(
						'Tutorial System View -> enableActions(): enable Interactive Map for MOVE'
					)
					break
				default:
					throw new Error(
						'Tutorial System View -> enableActions(): unknown DNDUserActionType!'
					)
			}
		}
	}

	protected disableAllActions(): void {
		console.log('Tutorial System View -> disableAllActions()')

		this._interactiveMapCanvas.disable()
		this._rightSideMenu.disableDiceRollerTab()
		this._actionsPanel.disable()
	}
}
