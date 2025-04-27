import TutorialModel from '../TutorialModel.ts'
import TutorialVM from './TutorialVM.ts'

export default class DNDTutorialVM extends TutorialVM {
	constructor(model: TutorialModel) {
		super()

		this._model = model
	}
}
