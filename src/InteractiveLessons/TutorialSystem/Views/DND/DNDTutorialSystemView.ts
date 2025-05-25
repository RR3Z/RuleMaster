import TutorialSystemPresenter from '../../TutorialSystemPresenter'
import { DNDUserActionType } from '../../Types/DND/DNDUserActionType'
import Menu from '../Components/Menu'
import TutorialSystemView from '../TutorialSystemView'

export default class DNDTutorialSystemView extends TutorialSystemView {
	constructor(presenter: TutorialSystemPresenter) {
		super()

		this._presenter = presenter

		// this._interactiveMapCanvas = new InteractiveMapCanvas()
		// this._actionsPanel = new ActionsPanel()
		// this._messageBox = new MessageBox()
		this._menu = new Menu()
	}

	protected enableActions(allowedActions: DNDUserActionType[]): void {
		for (const action of allowedActions) {
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
		this._menu.disableDiceRollerTab()
		this._actionsPanel.disable()
	}
}
