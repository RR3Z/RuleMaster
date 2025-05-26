import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import { EntityType } from '@/InteractiveLessons/Entities/EntityType'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import DNDInitiativeTracker from './DNDInitiativeTracker'

export default class DNDInitiativeManager {
	private _tracker: DNDInitiativeTracker

	constructor() {
		this._tracker = new DNDInitiativeTracker()
	}

	public updateTurnsOrder(
		enemies: DNDCharacter[],
		enemiesRollValues: number[],
		player: DNDCharacter,
		playerRollValue: number
	): void {
		if (player.type !== EntityType.PLAYER) {
			throw new Error(
				`DNDInitiativeManager -> updateTurnsOrder(): \'player\' type is not EntityType.PLAYER!`
			)
		}

		enemies.map(enemy => {
			if (enemy.type !== EntityType.ENEMY)
				throw new Error(
					`DNDInitiativeManager -> updateTurnsOrder(): \'enemy\' ${enemy} type is not EntityType.ENEMY!`
				)
		})

		if (playerRollValue <= 0) {
			throw new Error(
				`DNDInitiativeManager -> updateTurnsOrder(): \'playerRollValue\' is <= 0!`
			)
		}

		if (enemies.length !== enemiesRollValues.length) {
			throw new Error(
				`DNDInitiativeManager -> updateTurnsOrder(): \'enemies\' and \'enemiesRollValues\' must have the same number of elements. Got ${enemies.length} and ${enemiesRollValues.length}.`
			)
		}

		enemiesRollValues.map(enemyRoll => {
			if (enemyRoll <= 0)
				throw new Error(
					`DNDInitiativeManager -> updateTurnsOrder(): some value (value: ${enemyRoll}) in \'enemiesRollValues\' is <= 0.`
				)
		})

		type Entry = { combatant: DNDCharacter; initiative: number }

		// Enemies Initiative Value
		const enemiesInitiativeModifiers = enemies.map(
			enemy => enemy.initiativeModifier
		)
		const enemyEntries: Entry[] = enemies.map((enemy, i) => ({
			combatant: enemy,
			initiative: enemiesRollValues[i] + enemiesInitiativeModifiers[i],
		}))

		// Player Initiative Value
		const playerInitiativeModifier = player.initiativeModifier
		const playerEntry: Entry = {
			combatant: player,
			initiative: playerRollValue + playerInitiativeModifier,
		}

		// Sort the turns order by initiative value in descending order
		const allEntries = [...enemyEntries, playerEntry]
		allEntries.sort((a, b) => b.initiative - a.initiative)

		const turnsOrder = allEntries.map(entry => entry.combatant)
		this._tracker.updateTurnsOrder(turnsOrder)
	}

	public next(): void {
		const { prev, current } = this._tracker.next()

		prev.stateMachine.changeState(DNDCharacterState.WAITING_TURN)
		current.stateMachine.changeState(DNDCharacterState.TURN)
	}
}
