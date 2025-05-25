import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { DNDTutorialStep } from '../Types/DND/DNDTutorialStep'
import TutorialSystemModel from './TutorialSystemModel'

export default class DNDTutorialSystemModel extends TutorialSystemModel {
	constructor() {
		super()
	}

	// TODO:
	public init(steps: DNDTutorialStep[], player: DNDCharacter): void {
		throw new Error('Method not implemented.')
	}
}
