import { EntityType } from '../../../_Enums/EntityType.ts'
import { EnemyData } from '../../../_Types/Characters.ts'
import CharacterStateMachine from '../CharacterStateMachine/CharacterStateMachine.ts'
import Character from './Character.ts'

export default class Enemy extends Character {
	constructor(data: EnemyData) {
		super(EntityType.ENEMY, data.position)

		this.stateMachine = new CharacterStateMachine()

		this._name = data.name
		this._class = data.mainInfo.class
		this._race = data.mainInfo.race
		this._maxHealth = data.mainInfo.maxHealth
		this._health = this._maxHealth
		this._defenceClass = data.mainInfo.defenceClass
		this._stats = new Map(data.stats)
		this._savingThrows = new Map(data.savingThrows)
		// this._spells = new Map(data.spells)
		this._spellSlots = new Map(data.spellSlots)
		this.position.next(data.position)
	}
}
