import DNDActionsManager from '@/InteractiveLessons/ActionsManager/DND/DNDActionsManager'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import CellsAStarPathFinder from '@/InteractiveLessons/InteractiveMap/Logic/PathFinder/CellsAStarPathFinder'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'
import {
	createEnemy,
	createGridOfCells,
	createPlayerWithSpells,
} from '../testsUtils'

test('Spell Attack -> DNDCharacter (TURN): Incorrect Distance between Characters', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 9 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 8 }))

	const attackPosition: Position = { x: 9, y: 9 }

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0] // Attack Spell (ACTOR_ATTACK)

	expect(() => {
		actionsManager.perform(
			player,
			spellAttackAction,
			attackSpell,
			attackPosition
		)
	}).toThrow(
		"DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: Can't use spell outside of the Spell Range!"
	)
})

test('Spell Attack -> DNDCharacter (TURN): Correct Distance between Characters (ACTOR_ATTACK)', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))

	const attackPosition: Position = { x: 2, y: 2 }

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0]

	actionsManager.perform(player, spellAttackAction, attackSpell, attackPosition)

	const hitRolls = [19, 19]
	actionsManager.perform(player, undefined, undefined, undefined, hitRolls)

	const damageRolls = [6, 3]
	actionsManager.perform(
		player,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		damageRolls
	)

	expect(enemies[0].currentHealth).toBe(10 - damageRolls[0])
	expect(enemies[1].currentHealth).toBe(10 - damageRolls[1])
})

test('Spell Attack -> DNDCharacter (TURN): Correct Distance between Characters (SAVING_THROW)', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))

	const attackPosition: Position = { x: 2, y: 2 }

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const savingThrowSpell = player.spells[1]

	actionsManager.perform(
		player,
		spellAttackAction,
		savingThrowSpell,
		attackPosition
	)

	const savingThrows = [3, 3]
	actionsManager.perform(
		player,
		undefined,
		undefined,
		undefined,
		undefined,
		savingThrows
	)

	const damageRolls = [6, 3]
	actionsManager.perform(
		player,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		damageRolls
	)

	expect(enemies[0].currentHealth).toBe(10 - damageRolls[0])
	expect(enemies[1].currentHealth).toBe(10 - damageRolls[1])
})

test('Spell Attack -> DNDCharacter (WAITING_TURN): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 9 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 8 }))

	const attackPosition: Position = { x: 9, y: 9 }

	const player = createPlayerWithSpells(DNDCharacterState.WAITING_TURN, {
		x: 0,
		y: 0,
	})
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0] // Attack Spell (ACTOR_ATTACK)

	expect(() => {
		actionsManager.perform(
			player,
			spellAttackAction,
			attackSpell,
			attackPosition
		)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test('Spell Attack -> DNDCharacter (DEAD): Incorrect state', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 9 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 8 }))

	const attackPosition: Position = { x: 9, y: 9 }

	const player = createPlayerWithSpells(DNDCharacterState.DEAD, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0] // Attack Spell (ACTOR_ATTACK)

	expect(() => {
		actionsManager.perform(
			player,
			spellAttackAction,
			attackSpell,
			attackPosition
		)
	}).toThrow(
		"DNDActionsManager -> perform(): Can't perform an action bcs actor is in incorrect state!"
	)
})

test('Spell Attack -> DNDCharacter (DEAD): Incorrect Spell type (HEAL)', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 9 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 9, y: 8 }))
	const attackArea: Position[] = []
	attackArea.push({ x: 9, y: 9 })
	attackArea.push({ x: 9, y: 8 })

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const healSpell = player.spells[2] // Heal Spell

	expect(() => {
		actionsManager.perform(player, spellAttackAction, healSpell, attackArea)
	}).toThrow(
		'DNDSpellAttackAction -> enterPhaseInput() -> RANGE_CHECK: spell have wrong type!'
	)
})

test("Spell Attack -> DNDCharacter (TURN): Player doesn't have a Spells", () => {})

test('Spell Attack -> DNDCharacter (TURN): Incorrect amount of Hit Rolls', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))

	const attackPosition: Position = { x: 2, y: 2 }

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0]

	actionsManager.perform(player, spellAttackAction, attackSpell, attackPosition)

	const hitRolls = [19, 15, 12]
	expect(() => {
		actionsManager.perform(player, undefined, undefined, undefined, hitRolls)
	}).toThrow(
		'DNDSpellAttackAction -> enterPhaseInput() -> HIT_CHECK:  number of Hit Rolls does not match the number of Targets!'
	)
})

test('Spell Attack -> DNDCharacter (TURN): Incorrect amount of Damage Rolls', () => {
	const enemies: DNDCharacter[] = []
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 1, y: 1 }))
	enemies.push(createEnemy(DNDCharacterState.WAITING_TURN, { x: 2, y: 2 }))

	const attackPosition: Position = { x: 2, y: 2 }

	const player = createPlayerWithSpells(DNDCharacterState.TURN, { x: 0, y: 0 })
	const gridOfCells = createGridOfCells(
		{ width: 10, height: 10 },
		player,
		enemies
	)
	const pathFinder = new CellsAStarPathFinder(gridOfCells)
	pathFinder.maxPathCost = -1

	const actionsManager = new DNDActionsManager(pathFinder, gridOfCells)
	const spellAttackAction = actionsManager.spellAttackAction
	const attackSpell = player.spells[0]

	actionsManager.perform(player, spellAttackAction, attackSpell, attackPosition)

	const hitRolls = [19, 19]
	actionsManager.perform(player, undefined, undefined, undefined, hitRolls)

	const damageRolls = [19, 15, 12]
	expect(() => {
		actionsManager.perform(
			player,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			damageRolls
		)
	}).toThrow(
		'DNDSpellAttackAction -> enterPhaseInput() -> APPLY_DAMAGE:  number of Damage Rolls does not match the number of Targets!'
	)
})
