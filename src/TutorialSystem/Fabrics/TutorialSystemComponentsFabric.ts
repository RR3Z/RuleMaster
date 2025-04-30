import { Game } from '../../InteractiveMap/_Types/GameType.ts'
import TutorialModel from '../TutorialModel.ts'
import DNDTutorialView from '../View/DNDTutorialView.ts'
import TutorialView from '../View/TutorialView.ts'
import DNDTutorialVM from '../ViewModel/DNDTutorialVM.ts'
import TutorialVM from '../ViewModel/TutorialVM.ts'

export default class TutorialSystemComponentsFabric {
	public static createView(game: Game, viewModel: TutorialVM): TutorialView {
		switch (game) {
			case Game.DND:
				return new DNDTutorialView(viewModel as DNDTutorialVM)
			default:
				throw new Error(
					'TutorialSystemComponentsFabric -> createView(): Unknown Game!'
				)
		}
	}

	public static createViewModel(game: Game, model: TutorialModel): TutorialVM {
		switch (game) {
			case Game.DND:
				return new DNDTutorialVM(model)
			default:
				throw new Error(
					'TutorialSystemComponentsFabric -> createViewModel(): Unknown Game!'
				)
		}
	}
}
