import TutorialVM from '../ViewModel/TutorialVM.ts'
import ActionsPanel from './Components/ActionsPanel.ts'
import InteractiveMapCanvas from './Components/InteractiveMapCanvas.ts'
import MessageBox from './Components/MessageBox.ts'
import RightSideMenu from './Components/RightSideMenu.ts'

export default abstract class TutorialView {
	protected _viewModel!: TutorialVM

	protected _interactiveMapCanvas!: InteractiveMapCanvas
	protected _messageBox!: MessageBox
	protected _rightSideMenu!: RightSideMenu
	protected _actionsPanel!: ActionsPanel

	protected abstract enableActions(...args: any[]): void
	protected abstract disableAllActions(...args: any[]): void
}
