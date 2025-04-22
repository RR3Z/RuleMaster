import { Position } from '../../_Types/Map.ts'
import { TriggerData } from '../../_Types/Triggers.ts'
import Player from '../Entities/Characters/Player.ts'
import Trigger from './Trigger.ts'

export default class TriggersManager {
	private _triggers: Set<Trigger>

	constructor(triggersData: TriggerData[], player: Player) {
		this._triggers = new Set()

		for (let i = 0; i < triggersData.length; i++) {
			this._triggers.add(new Trigger(triggersData[i]))
		}

		player.position.subscribe((pos: Position) => {
			this.check(pos)
		})
	}

	public get triggers(): ReadonlySet<Trigger> {
		return this._triggers
	}

	public check(pos: Position): void {
		for (const trigger of this._triggers) {
			if (trigger.pos.x === pos.x && trigger.pos.y === pos.y) {
				trigger.onEnter()
				this.disableAllTriggersByTutorialStepIndex(trigger.tutorialStepIndex)
				break
			}
		}
	}

	private disableAllTriggersByTutorialStepIndex(
		tutorialStepIndex: number
	): void {
		this._triggers.forEach((trigger: Trigger) => {
			if (trigger.tutorialStepIndex === tutorialStepIndex) trigger.switchState()
		})
	}
}
