import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'
import {
	createEnemy,
	createGridOfCells,
	createPlayer,
	createPlayerWithSpells,
} from '../testsUtils'

test('DNDActionsManager: Correct Sequence of Two Different Actions', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 1, y: 1 })

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 3, height: 3 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)

	const damageRoll = 3
	const hitRoll = 19

	// First (MELEE)
	const meleeAttackAction = actionsManager.meleeAttackAction
	actionsManager.perform(player, meleeAttackAction, attackArea)
	actionsManager.perform(player, undefined, undefined, [hitRoll])
	actionsManager.perform(player, undefined, undefined, undefined, [damageRoll])
	expect(enemies[0].currentHealth).toBe(10 - damageRoll)
	// Second (SPELL)
	const spellAttackAction = actionsManager.spellAttackAction
	actionsManager.perform(
		player,
		spellAttackAction,
		player.spells[0],
		attackArea[0]
	)
	actionsManager.perform(player, undefined, undefined, undefined, [
		hitRoll,
		hitRoll,
	])
	actionsManager.perform(
		player,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		[damageRoll, damageRoll]
	)
	expect(enemies[0].currentHealth).toBe(10 - damageRoll - damageRoll)
	expect(player.currentHealth).toBe(10 - damageRoll)
})

test('DNDActionsManager: Correct Sequence of Two Same Actions', () => {
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

	const damageRoll = 3
	const hitRoll = 19

	// First
	actionsManager.perform(player, meleeAttackAction, attackArea)
	actionsManager.perform(player, undefined, undefined, [hitRoll])
	actionsManager.perform(player, undefined, undefined, undefined, [damageRoll])
	expect(enemies[0].currentHealth).toBe(10 - damageRoll)
	// Second
	actionsManager.perform(player, meleeAttackAction, attackArea)
	actionsManager.perform(player, undefined, undefined, [hitRoll])
	actionsManager.perform(player, undefined, undefined, undefined, [damageRoll])
	expect(enemies[0].currentHealth).toBe(10 - damageRoll - damageRoll)
})

test('DNDActionsManager: Incorrect Sequence of Two Actions (trying apply another action while previous is not completed)', () => {
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
	const spellAttackAction = actionsManager.spellAttackAction

	actionsManager.perform(player, meleeAttackAction, attackArea)

	expect(() => {
		actionsManager.perform(player, spellAttackAction, attackArea)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform a new action while the current one is not completed!"
	)
})
