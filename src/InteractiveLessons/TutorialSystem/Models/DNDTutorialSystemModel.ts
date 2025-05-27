import { ActionPhase } from '@/InteractiveLessons/ActionsManager/ActionPhase'
import DNDMeleeAttackAction, {
	MeleeAttackActionPerformedEvent,
} from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDMeleeAttackAction'
import { MoveActionPerformedEvent } from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDMoveAction'
import DNDRangedAttackAction, {
	RangedAttackActionPerformedEvent,
} from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDRangedAttackAction'
import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
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

		// TUTORIAL SYSTEM EVENTS
		this._onNextStep$.subscribe(() => {
			this.onNextStep(actionsManager.actor, diceRoller, actionsManager)
		})

		// DICE ROLLER EVENTS
		diceRoller.onSelectDices$.subscribe((formulas: DiceRollerFormula[]) => {
			this.onSelectDices(formulas, diceRoller)
		})
		diceRoller.onRollEnd$.subscribe((results: DiceRollerResult[]) => {
			this.onRollEnd()
		})

		// DND ACTIONS EVENTS
		// MOVE TODO: подсвечивать клетку, куда надо переместиться
		actionsManager.onMoveActionPerformed.subscribe(
			(event: MoveActionPerformedEvent) => {
				this.onMoveActionPerformed(actionsManager, event.actor, event.newPos)
			}
		)
		actionsManager.onPositionChange.subscribe((actor: DNDCharacter) => {
			this.onPositionChange(actor)
		})
		// MELEE ATTACK
		actionsManager.onMeleeAttackActionPerformed.subscribe(
			(event: MeleeAttackActionPerformedEvent) => {
				this.onMeleeAttackActionPerformed(
					actionsManager,
					event.actor,
					event.targets
				)
			}
		)
		actionsManager.onRangedAttackActionPerformed.subscribe(
			(event: RangedAttackActionPerformedEvent) => {
				this.onRangedAttackActionPerformed(
					actionsManager,
					event.actor,
					event.targets
				)
			}
		)
		// TODO: Spell Attack

		this.nextStep()
	}

	private onNextStep(
		actor: DNDCharacter,
		diceRoller: DiceRoller,
		actionsManager: DNDActionsManager
	): void {
		const currentStep = this._steps[this._currentStepIndex]
		const currentAction = actionsManager.current

		if (
			currentAction instanceof DNDMeleeAttackAction &&
			currentAction.currentPhase() === ActionPhase.HIT_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.MELEE_ATTACK_HITS_CHECK
		) {
			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					this.onSelectDices(formulas, diceRoller)
				}
			)
			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					actionsManager.perform(actor, undefined, undefined, results)
					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()
					this.onRollEnd()
				}
			)
		} else if (
			currentAction instanceof DNDMeleeAttackAction &&
			currentAction.currentPhase() === ActionPhase.APPLY_DAMAGE &&
			currentStep.expectedAction.type ===
				DNDUserActionType.MELEE_ATTACK_APPLY_DAMAGE
		) {
			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					this.onSelectDices(formulas, diceRoller)
				}
			)
			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						results
					)
					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()
					this.onRollEnd()
				}
			)
		} else if (
			currentAction instanceof DNDRangedAttackAction &&
			currentAction.currentPhase() === ActionPhase.HIT_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.RANGED_ATTACK_HITS_CHECK
		) {
			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					this.onSelectDices(formulas, diceRoller)
				}
			)
			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					actionsManager.perform(actor, undefined, undefined, results)
					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()
					this.onRollEnd()
				}
			)
		} else if (
			currentAction instanceof DNDRangedAttackAction &&
			currentAction.currentPhase() === ActionPhase.APPLY_DAMAGE &&
			currentStep.expectedAction.type ===
				DNDUserActionType.RANGED_ATTACK_APPLY_DAMAGE
		) {
			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					this.onSelectDices(formulas, diceRoller)
				}
			)
			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						results
					)
					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()
					this.onRollEnd()
				}
			)
		}
	}

	private onSelectDices(
		formulas: DiceRollerFormula[],
		diceRoller: DiceRoller
	): void {
		console.log('onSelectDices')
		const currentStep = this._steps[this._currentStepIndex]
		const expectedActionParams = currentStep.expectedAction
			.params as DiceRollerFormula[]

		if (
			currentStep.expectedAction.type !==
				DNDUserActionType.MELEE_ATTACK_HITS_CHECK &&
			currentStep.expectedAction.type !==
				DNDUserActionType.MELEE_ATTACK_APPLY_DAMAGE &&
			currentStep.expectedAction.type !==
				DNDUserActionType.RANGED_ATTACK_HITS_CHECK &&
			currentStep.expectedAction.type !==
				DNDUserActionType.RANGED_ATTACK_APPLY_DAMAGE
		) {
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

	private onMeleeAttackActionPerformed(
		actionsManager: DNDActionsManager,
		actor: DNDCharacter,
		targets: DNDCharacter[]
	): void {
		const currentStep = this._steps[this._currentStepIndex]

		if (actor.type !== currentStep.actorType) {
			console.error(
				'DNDTutorialSystemModel -> onMeleeAttackActionPerformed(): Тот кто совершает действие не совпадает по типу с тем, кто должен его совершить!'
			)
			return
		}

		if (
			currentStep.expectedAction.type !==
			DNDUserActionType.MELEE_ATTACK_TARGETS_SELECTION
		) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
			return
		}

		if (targets.length === 0) {
			this._onWrongAction$.next(
				"Вы атаковали по пустому месту! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
			return
		}

		for (const target of targets) {
			if (target.type === EntityType.PLAYER) {
				this._onWrongAction$.next(
					"Вы атаковали себя! Повторите действие снова! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
				)
				actionsManager.resetCurrentAction()
				return
			}
		}

		this.nextStep()
	}

	private onRangedAttackActionPerformed(
		actionsManager: DNDActionsManager,
		actor: DNDCharacter,
		targets: DNDCharacter[]
	): void {
		const currentStep = this._steps[this._currentStepIndex]

		if (actor.type !== currentStep.actorType) {
			console.error(
				'DNDTutorialSystemModel -> onRangedAttackActionPerformed(): Тот кто совершает действие не совпадает по типу с тем, кто должен его совершить!'
			)
			return
		}

		if (
			currentStep.expectedAction.type !==
			DNDUserActionType.RANGED_ATTACK_TARGETS_SELECTION
		) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
			return
		}

		if (targets.length === 0) {
			this._onWrongAction$.next(
				"Вы атаковали по пустому месту! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
			return
		}

		for (const target of targets) {
			if (target.type === EntityType.PLAYER) {
				this._onWrongAction$.next(
					"Вы атаковали себя! Повторите действие снова! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
				)
				actionsManager.resetCurrentAction()
				return
			}
		}

		this.nextStep()
	}
}
