import { MoveActionPerformedEvent } from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDMoveAction'
import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { Position } from '@/InteractiveLessons/Types/Position'
import { arraysShallowEqualUnordered } from '@/InteractiveLessons/Utils'
import { DNDTutorialStep } from '../Types/DND/DNDTutorialStep'
import { DNDUserActionType } from '../Types/DND/DNDUserActionType'
import TutorialSystemModel from './TutorialSystemModel'

export default class DNDTutorialSystemModel extends TutorialSystemModel {
	constructor() {
		super()
	}

	// TODO:
	public init(
		steps: DNDTutorialStep[],
		diceRoller: DiceRoller,
		actionsManager: DNDActionsManager
	): void {
		this._steps = steps

		// DICE ROLLER EVENTS
		diceRoller.onSelectDices$.subscribe((formulas: DiceRollerFormula[]) => {
			this.onSelectDices(formulas, diceRoller)
		})
		diceRoller.onRollEnd$.subscribe(() => {
			this.onRollEnd()
		})

		// DND ACTIONS EVENTS
		// MOVE
		actionsManager.onMoveActionPerformed.subscribe(
			(event: MoveActionPerformedEvent) => {
				this.onMoveActionPerformed(actionsManager, event.actor, event.newPos)
			}
		)
		actionsManager.onPositionChange.subscribe((actor: DNDCharacter) => {
			this.onPositionChange(actor)
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

	private onMoveActionPerformed(
		actionsManager: DNDActionsManager,
		actor: DNDCharacter,
		newPos: Position
	): void {
		const currentStep = this._steps[this._currentStepIndex]
		const expectedNewPos = currentStep.expectedAction.params as Position

		if (actor.type !== currentStep.actorType) {
			console.error(
				'DNDTutorialSystemModel -> onMoveActionPerformed(): Тот кто совершает действие не совпадает по типу с тем, кто должен его совершить!'
			)
			return
		}

		if (currentStep.expectedAction.type !== DNDUserActionType.MOVE) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return
		}

		if (expectedNewPos.x !== newPos.x || expectedNewPos.y !== newPos.y) {
			this._onWrongAction$.next(
				"Вы переместились не туда, куда надо! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return
		}

		actionsManager.perform(actor)
	}

	private onPositionChange(actor: DNDCharacter) {
		const currentStep = this._steps[this._currentStepIndex]

		if (currentStep.expectedAction.type !== DNDUserActionType.MOVE) {
			return
		}

		this.nextStep()
	}
}
