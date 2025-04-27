import DNDTutorialVM from '../ViewModel/DNDTutorialVM.ts'
import TutorialView from './TutorialView.ts'

export default class DNDTutorialView extends TutorialView {
	constructor(viewModel: DNDTutorialVM) {
		super()

		this._viewModel = viewModel
	}
}
