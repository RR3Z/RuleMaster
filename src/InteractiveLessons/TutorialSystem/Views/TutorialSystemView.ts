import TutorialSystemPresenter from '../TutorialSystemPresenter'
import ActionsPanel from './Components/ActionsPanel'
import InteractiveMapCanvas from './Components/InteractiveMapCanvas'
import Menu from './Components/Menu'
import MessageBox from './Components/MessageBox'

export default abstract class TutorialSystemView {
	protected _presenter!: TutorialSystemPresenter

	protected _interactiveMapCanvas!: InteractiveMapCanvas
	protected _messageBox!: MessageBox
	protected _menu!: Menu
	protected _actionsPanel!: ActionsPanel

	protected abstract enableActions(...args: any): void
	public abstract disableAllActions(...args: any): void
}
