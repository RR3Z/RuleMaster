import { Game } from '@/InteractiveLessons/Types/Game'
import TutorialSystemPresenter from '../TutorialSystemPresenter'
import DNDTutorialSystemView from '../Views/DND/DNDTutorialSystemView'
import TutorialSystemView from '../Views/TutorialSystemView'

export default class TutorialSystemComponentsFabric {
	public static createView(
		game: Game,
		presenter: TutorialSystemPresenter
	): TutorialSystemView {
		switch (game) {
			case Game.DND:
				return new DNDTutorialSystemView(presenter)
			default:
				throw new Error(
					'TutorialSystemComponentsFabric -> createView(): Unknown Game!'
				)
		}
	}
}
