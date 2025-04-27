import { BRPGame } from '../BRPGame.ts'
import TutorialModel from '../TutorialModel.ts'
import DNDTutorialView from '../View/DNDTutorialView.ts'
import TutorialView from '../View/TutorialView.ts'
import DNDTutorialVM from '../ViewModel/DNDTutorialVM.ts'
import TutorialVM from '../ViewModel/TutorialVM.ts'

export default class TutorialSystemComponentsFabric {
	public createView(game: BRPGame, viewModel: TutorialVM): TutorialView {
		switch (game) {
			case BRPGame.DND:
				return new DNDTutorialView(viewModel)
			default:
				throw new Error(
					'TutorialSystemComponentsFabric -> createView(): Unknown Game!'
				)
		}
	}

	public createViewModel(game: BRPGame, model: TutorialModel): TutorialVM {
		switch (game) {
			case BRPGame.DND:
				return new DNDTutorialVM(model)
			default:
				throw new Error(
					'TutorialSystemComponentsFabric -> createViewModel(): Unknown Game!'
				)
		}
	}
}
