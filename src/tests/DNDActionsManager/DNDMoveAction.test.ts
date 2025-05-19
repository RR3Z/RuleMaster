import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import Boundary from '@/InteractiveLessons/Entities/Boundary'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { createEnemy, createGridOfCells, createPlayer } from '../testsUtils'

test('Move DNDCharacter (TURN) from (0,0) to (2,2) and Cell at (2,2) is Empty', () => {
	const player = createPlayer(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells({ width: 3, height: 3 }, player)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const newPos = { x: 2, y: 2 }
	const moveAction = actionsManager.moveAction
	actionsManager.perform(player, moveAction, newPos)

	expect(player.currentMovementSpeed).toBe(20)
	expect(player.pos).toStrictEqual(newPos)
	expect(gridOfCells.cell(newPos).content).toBe(player)
})

test('Move DNDCharacter (TURN) from (0,0) to (1,1) and Cell at (1,1) is Boundary', () => {
	const oldPos = { x: 0, y: 0 }
	const newPos = { x: 1, y: 1 }

	const player = createPlayer(DNDCharacterState.TURN, oldPos)
	const boundaries = [newPos]
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		undefined,
		boundaries
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const moveAction = actionsManager.moveAction

	expect(() => {
		actionsManager.perform(player, moveAction, newPos)
	}).toThrow('CellsAStarPathFinder -> shortestPath(): End Cell is not empty!')
	expect(player.currentMovementSpeed).toBe(30)
	expect(player.pos).toStrictEqual(oldPos)
	expect(gridOfCells.cell(oldPos).content).toBe(player)
	expect(gridOfCells.cell(newPos).content).toBeInstanceOf(Boundary)
})

test('Move DNDCharacter (TURN) from (0,0) to (1,1) and Cell at (1,1) have DNDCharacter on it', () => {
	const oldPos = { x: 0, y: 0 }
	const newPos = { x: 1, y: 1 }

	const player = createPlayer(DNDCharacterState.TURN, oldPos)
	const enemies = [createEnemy(DNDCharacterState.WAITING_TURN, newPos)]
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies,
		undefined
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const moveAction = actionsManager.moveAction

	expect(() => {
		actionsManager.perform(player, moveAction, newPos)
	}).toThrow('CellsAStarPathFinder -> shortestPath(): End Cell is not empty!')
	expect(player.currentMovementSpeed).toBe(30)
	expect(player.pos).toStrictEqual(oldPos)
	expect(gridOfCells.cell(oldPos).content).toBe(player)
	expect(gridOfCells.cell(newPos).content).toBe(enemies[0])
})

test('Move DNDCharacter (TURN) from (0,0) to (0,0)', () => {
	const oldPos = { x: 0, y: 0 }
	const newPos = { x: 0, y: 0 }

	const player = createPlayer(DNDCharacterState.TURN, oldPos)
	const gridOfCells = createGridOfCells({ width: 3, height: 3 }, player)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const moveAction = actionsManager.moveAction
	actionsManager.perform(player, moveAction, newPos)

	expect(player.currentMovementSpeed).toBe(30)
	expect(player.pos).toStrictEqual(oldPos)
	expect(gridOfCells.cell(newPos).content).toBe(player)
})

test('Move DNDCharacter (WAITING_TURN) in incorrect state', () => {
	const oldPos = { x: 0, y: 0 }
	const newPos = { x: 2, y: 2 }

	const player = createPlayer(DNDCharacterState.WAITING_TURN, oldPos)
	const gridOfCells = createGridOfCells({ width: 3, height: 3 }, player)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const moveAction = actionsManager.moveAction

	expect(() => {
		actionsManager.perform(player, moveAction, newPos)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test('Move DNDCharacter (DEAD) in incorrect state', () => {
	const oldPos = { x: 0, y: 0 }
	const newPos = { x: 2, y: 2 }

	const player = createPlayer(DNDCharacterState.DEAD, oldPos)
	const gridOfCells = createGridOfCells({ width: 3, height: 3 }, player)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const moveAction = actionsManager.moveAction

	expect(() => {
		actionsManager.perform(player, moveAction, newPos)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})
