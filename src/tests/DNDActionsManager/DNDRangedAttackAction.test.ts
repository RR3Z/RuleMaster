import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'
import {
	createEnemy,
	createGridOfCells,
	createPlayer,
	createPlayerWithBow,
} from '../testsUtils'

test('Ranged Attack -> DNDCharacter (TURN): Incorrect Distance between Characters', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 9 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 9, y: 9 })

	const player = createPlayerWithBow(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	expect(() => {
		actionsManager.perform(player, rangedAttackAction, attackArea)
	}).toThrow(
		"DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't attack outside of the Attack Range!"
	)
})

test('Ranged Attack -> DNDCharacter (TURN): Boundary in the way of the Ranged Attack', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 2, y: 2 })

	const boundaries = [{ x: 1, y: 1 }]
	const player = createPlayerWithBow(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies,
		boundaries
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	expect(() => {
		actionsManager.perform(player, rangedAttackAction, attackArea)
	}).toThrow(
		'DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: Something in the path of the shot!'
	)
})

test('Ranged Attack -> DNDCharacter (TURN): Correct Distance between Characters', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))

	const attackArea: Position[] = []
	attackArea.push({ x: 2, y: 2 })

	const player = createPlayerWithBow(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	actionsManager.perform(player, rangedAttackAction, attackArea)

	const hitRoll = 19
	actionsManager.perform(player, undefined, undefined, [hitRoll])

	const damageRoll = 3
	actionsManager.perform(player, undefined, undefined, undefined, [damageRoll])

	expect(enemies[0].currentHealth).toBe(10 - damageRoll)
})

test('Ranged Attack -> DNDCharacter (WAITING_TURN): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayerWithBow(DNDCharacterState.WAITING_TURN, {
		x: 0,
		y: 0,
	})
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	expect(() => {
		actionsManager.perform(player, rangedAttackAction, attackArea)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test('Ranged Attack -> DNDCharacter (DEAD): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayerWithBow(DNDCharacterState.DEAD, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	expect(() => {
		actionsManager.perform(player, rangedAttackAction, attackArea)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test("Ranged Attack -> DNDCharacter (TURN): Player doesn't have a Range Weapon", () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayer(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const rangedAttackAction = actionsManager.rangedAttackAction

	expect(() => {
		actionsManager.perform(player, rangedAttackAction, attackArea)
	}).toThrow(
		"DNDRangedAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't attack without Range Weapon!"
	)
})
