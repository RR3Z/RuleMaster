import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'
import { createEnemy, createGridOfCells, createPlayer } from '../testsUtils'

test('Melee Attack -> DNDCharacter (TURN): Incorrect Distance between Characters', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 1 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 2, y: 1 })

	const player = createPlayer(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const meleeAttackAction = actionsManager.meleeAttackAction

	expect(() => {
		actionsManager.perform(player, meleeAttackAction, attackArea)
	}).toThrow(
		'DNDMeleeAttackAction -> enterPhaseInput() -> RANGE_CHECK: Wrong attack area!'
	)
})

test('Melee Attack -> DNDCharacter (TURN): Correct Distance between Characters', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayer(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const meleeAttackAction = actionsManager.meleeAttackAction

	actionsManager.perform(player, meleeAttackAction, attackArea)

	const hitRoll = 19
	actionsManager.perform(player, undefined, undefined, [hitRoll])

	const damageRoll = 3
	actionsManager.perform(player, undefined, undefined, undefined, [damageRoll])

	expect(enemies[0].currentHealth).toBe(10 - damageRoll)
})

test('Melee Attack -> DNDCharacter (WAITING_TURN): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayer(DNDCharacterState.WAITING_TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const meleeAttackAction = actionsManager.meleeAttackAction

	expect(() => {
		actionsManager.perform(player, meleeAttackAction, attackArea)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test('Melee Attack -> DNDCharacter (DEAD): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayer(DNDCharacterState.DEAD, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const meleeAttackAction = actionsManager.meleeAttackAction

	expect(() => {
		actionsManager.perform(player, meleeAttackAction, attackArea)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})
