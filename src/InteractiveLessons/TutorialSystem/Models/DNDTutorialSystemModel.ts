import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { arraysShallowEqualUnordered } from '@/InteractiveLessons/Utils'
import { DNDTutorialStep } from '../Types/DND/DNDTutorialStep'
import { DNDUserActionType } from '../Types/DND/DNDUserActionType'
import TutorialSystemModel from './TutorialSystemModel'

export default class DNDTutorialSystemModel extends TutorialSystemModel {
	constructor() {
		super()
	}

	// TODO:
	public init(steps: DNDTutorialStep[], diceRoller: DiceRoller): void {
		this._steps = steps

		// DICE ROLLER EVENTS
		diceRoller.onSelectDices$.subscribe((formulas: DiceRollerFormula[]) => {
			this.onSelectDices(formulas, diceRoller)
		})
		diceRoller.onRollEnd$.subscribe(() => {
			this.onRollEnd()
		})
	}

	private onSelectDices(
		formulas: DiceRollerFormula[],
		diceRoller: DiceRoller
	): void {
		const currentStep = this._steps[this._currentStepIndex]
		const expectedActionParams = currentStep.expectedAction
			.params as DiceRollerFormula[]

		if (currentStep.expectedAction.type !== DNDUserActionType.ROLL) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return
		}

		if (!arraysShallowEqualUnordered(formulas, expectedActionParams)) {
			this._onWrongAction$.next(
				"Вы выбрали не те кубики! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return
		}

		diceRoller.makeRoll(formulas)
	}

	private onRollEnd(): void {
		const currentStep = this._steps[this._currentStepIndex]

		if (currentStep.expectedAction.type !== DNDUserActionType.ROLL) {
			return
		}

		this.nextStep()
	}
}
