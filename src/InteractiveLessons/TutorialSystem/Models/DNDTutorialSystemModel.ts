import { ActionPhase } from '@/InteractiveLessons/ActionsManager/ActionPhase'
import DNDMeleeAttackAction, {
	MeleeAttackActionPerformedEvent,
} from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDMeleeAttackAction'
import { MoveActionPerformedEvent } from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDMoveAction'
import DNDRangedAttackAction, {
	RangedAttackActionPerformedEvent,
} from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDRangedAttackAction'
import DNDSpellAttackAction, {
	SpellAttackActionPerformedEvent,
} from '@/InteractiveLessons/ActionsManager/DND/Actions/DNDSpellAttackAction'
import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DiceRoller from '@/InteractiveLessons/DiceRoller/DiceRoller'
import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import GridOfCellsAreaHighlighter from '@/InteractiveLessons/InteractiveMap/Visual/AreaHighlighter/GridOfCellsAreaHighlighter'
import DraggableOnCellsToken from '@/InteractiveLessons/InteractiveMap/Visual/Tokens/DraggableOnCellsToken'
import Logger from '@/InteractiveLessons/Logger/Logger'
import { DNDSpellData } from '@/InteractiveLessons/Spells/DND/DNDSpellData'
import { Position } from '@/InteractiveLessons/Types/Position'
import { arraysShallowEqualUnordered } from '@/InteractiveLessons/Utils'
import { DNDTutorialStep } from '../Types/DND/DNDTutorialStep'
import { DNDUserActionType } from '../Types/DND/DNDUserActionType'
import TutorialSystemModel from './TutorialSystemModel'

export default class DNDTutorialSystemModel extends TutorialSystemModel {
	constructor() {
		super()
	}

	public init(
		steps: DNDTutorialStep[],
		logger: Logger,
		diceRoller: DiceRoller,
		actionsManager: DNDActionsManager,
		playerToken: DraggableOnCellsToken,
		areaHighlighter: GridOfCellsAreaHighlighter
	): void {
		this._steps = steps
		this._logger = logger
		actionsManager.resetCurrentAction()

		// TUTORIAL SYSTEM EVENTS
		this._onNextStep$.subscribe(() => {
			this.onNextStep(actionsManager.actor, diceRoller, actionsManager)
		})

		// AREA HIGHLIGHTER EVENTS
		areaHighlighter.onAreaSelectionEnabled$.subscribe(() => {
			playerToken.interactive = false
		})

		areaHighlighter.onAreaSelectionDisabled$.subscribe(() => {
			playerToken.interactive = true
		})

		// ACTIONS MANAGER EVENTS
		actionsManager.onPerformError$.subscribe((errorMsg: string) => {
			this._onWrongAction$.next(errorMsg)
		})

		// DICE ROLLER EVENTS
		diceRoller.onSelectDices$.subscribe((formulas: DiceRollerFormula[]) => {
			this.checkDiceRollerActions(formulas)
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
		// RANGED ATTACK
		actionsManager.onRangedAttackActionPerformed.subscribe(
			(event: RangedAttackActionPerformedEvent) => {
				this.onRangedAttackActionPerformed(
					actionsManager,
					event.actor,
					event.targets
				)
			}
		)
		// SPELL ATTACK
		actionsManager.onSpellAttackActionPerformed.subscribe(
			(event: SpellAttackActionPerformedEvent) => {
				this.onSpellAttackActionPerformed(
					actionsManager,
					event.actor,
					event.spell,
					event.targets
				)
			}
		)

		this.nextStep()
	}

	private onNextStep(
		actor: DNDCharacter,
		diceRoller: DiceRoller,
		actionsManager: DNDActionsManager
	): void {
		const currentStep = this._steps[this._currentStepIndex]
		const currentAction = actionsManager.current

		this._logger.newLog({
			logType: 1,
			actorName: 'Система',
			details: currentStep.messages.join(' '),
		})

		if (
			currentAction instanceof DNDMeleeAttackAction &&
			currentAction.currentPhase() === ActionPhase.HIT_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.MELEE_ATTACK_HITS_CHECK
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						results.map(result => result.value)
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()

					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDMeleeAttackAction &&
			currentAction.currentPhase() === ActionPhase.APPLY_DAMAGE &&
			currentStep.expectedAction.type ===
				DNDUserActionType.MELEE_ATTACK_APPLY_DAMAGE
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						results
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()

					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDRangedAttackAction &&
			currentAction.currentPhase() === ActionPhase.HIT_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.RANGED_ATTACK_HITS_CHECK
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						results.map(result => result.value)
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()

					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDRangedAttackAction &&
			currentAction.currentPhase() === ActionPhase.APPLY_DAMAGE &&
			currentStep.expectedAction.type ===
				DNDUserActionType.RANGED_ATTACK_APPLY_DAMAGE
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						results
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()
					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDSpellAttackAction &&
			currentAction.currentPhase() === ActionPhase.HIT_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.SPELL_ATTACK_HITS_CHECK
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						results.map(result => result.value)
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()

					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDSpellAttackAction &&
			currentAction.currentPhase() === ActionPhase.APPLY_DAMAGE &&
			currentStep.expectedAction.type ===
				DNDUserActionType.SPELL_ATTACK_APPLY_DAMAGE
		) {
			const formulasVar: DiceRollerFormula[] = []

			const onSelectDicesSubscription = diceRoller.onSelectDices$.subscribe(
				(formulas: DiceRollerFormula[]) => {
					formulasVar.push(...formulas)
					this.onSelectDices(formulas, diceRoller)
				}
			)

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: formulasVar, results: results },
					})

					actionsManager.perform(
						actor,
						undefined,
						undefined,
						undefined,
						undefined,
						undefined,
						[results.map(r => r.value).reduce((sum, val) => sum + val, 0)]
					)

					onSelectDicesSubscription.unsubscribe()
					onRollEndSubscription.unsubscribe()

					this.nextStep()
				}
			)
		} else if (
			currentAction instanceof DNDSpellAttackAction &&
			currentAction.currentPhase() === ActionPhase.SAVING_THROW_CHECK &&
			currentStep.expectedAction.type ===
				DNDUserActionType.SPELL_ATTACK_TARGETS_SAVING_THROWS
		) {
			const targetsRolls: number[] = []
			let currentTargetIndex = 0
			const targets = actionsManager.spellAttackAction.targets

			const onRollEndSubscription = diceRoller.onRollEnd$.subscribe(
				(results: DiceRollerResult[]) => {
					this._logger.newLog({
						logType: 0,
						actorName: actor.name,
						details: { formulas: [{ type: 5, count: 1 }], results: results },
					})

					const values = results.map(result => result.value)
					targetsRolls.push(...values)

					currentTargetIndex++
					if (currentTargetIndex >= targets.length) {
						onRollEndSubscription.unsubscribe()
						actionsManager.perform(
							actor,
							undefined,
							undefined,
							undefined,
							undefined,
							targetsRolls
						)
						this.nextStep()
					} else {
						diceRoller.makeRoll([{ type: 5, count: 1 }])
					}
				}
			)

			diceRoller.makeRoll([{ type: 5, count: 1 }])
		}
	}

	private checkDiceRollerActions(formulas: DiceRollerFormula[]): boolean {
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
				DNDUserActionType.RANGED_ATTACK_APPLY_DAMAGE &&
			currentStep.expectedAction.type !==
				DNDUserActionType.SPELL_ATTACK_HITS_CHECK &&
			currentStep.expectedAction.type !==
				DNDUserActionType.SPELL_ATTACK_APPLY_DAMAGE &&
			currentStep.expectedAction.type !==
				DNDUserActionType.SPELL_ATTACK_TARGETS_SAVING_THROWS
		) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return false
		}

		if (!arraysShallowEqualUnordered(formulas, expectedActionParams)) {
			this._onWrongAction$.next(
				"Вы выбрали не те кубики! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			return false
		}

		return true
	}

	private onSelectDices(
		formulas: DiceRollerFormula[],
		diceRoller: DiceRoller
	): void {
		if (this.checkDiceRollerActions(formulas)) diceRoller.makeRoll(formulas)
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
			actionsManager.resetCurrentAction()
			return
		}

		if (expectedNewPos.x !== newPos.x || expectedNewPos.y !== newPos.y) {
			this._onWrongAction$.next(
				"Вы переместились не туда, куда надо! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
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

		this._logger.newLog({
			logType: 2,
			actorName: actor.name,
			details: undefined,
		})
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

		this._logger.newLog({
			logType: 3,
			actorName: actor.name,
			details: undefined,
		})

		this.nextStep()
	}

	private onSpellAttackActionPerformed(
		actionsManager: DNDActionsManager,
		actor: DNDCharacter,
		spell: DNDSpellData,
		targets: DNDCharacter[]
	): void {
		const currentStep = this._steps[this._currentStepIndex]

		if (actor.type !== currentStep.actorType) {
			console.error(
				'DNDTutorialSystemModel -> onSpellAttackActionPerformed(): Тот кто совершает действие не совпадает по типу с тем, кто должен его совершить!'
			)
			return
		}

		if (
			currentStep.expectedAction.type !==
			DNDUserActionType.SPELL_ATTACK_TARGETS_SELECTION
		) {
			this._onWrongAction$.next(
				"Вы совершили неверное действие! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
			)
			actionsManager.resetCurrentAction()
			return
		}

		if ((currentStep.expectedAction.params as string) !== spell.name) {
			this._onWrongAction$.next(
				"Вы выбрали неверное заклинание! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
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
					"Вы задели себя! Повторите действие снова! Прочтите сообщение (вкладка 'Логи' в меню справа) еще раз!"
				)
				actionsManager.resetCurrentAction()
				return
			}
		}

		this._logger.newLog({
			logType: 4,
			actorName: actor.name,
			details: { spellName: spell.name },
		})
		this.nextStep()
	}
}
