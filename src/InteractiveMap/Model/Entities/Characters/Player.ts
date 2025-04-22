import { Background } from '../../../_Enums/Background.ts'
import { EntityType } from '../../../_Enums/EntityType.ts'
import { Stat } from '../../../_Enums/Stat.ts'
import { PlayerData, SavingThrowData } from '../../../_Types/Characters.ts'
import { SpellSlots } from '../../../_Types/Spell.ts'
import CharacterStateMachine from '../CharacterStateMachine/CharacterStateMachine.ts'
import Character from './Character.ts'

export default class Player extends Character {
	private _background: Background

	constructor(data: PlayerData) {
		super(EntityType.PLAYER, data.position)

		this.stateMachine = new CharacterStateMachine()

		this._name = data.name
		this._maxHealth = data.mainInfo.maxHealth
		this._health = this._maxHealth
		this._defenceClass = data.mainInfo.defenceClass
		this._level = data.mainInfo.level
		this._class = data.mainInfo.class
		this._race = data.mainInfo.race
		this._background = data.mainInfo.background
		this._stats = new Map<Stat, number>(data.stats)
		//TODO: this._skills = data.skills
		this._savingThrows = new Map<Stat, SavingThrowData>(data.savingThrows)
		//TODO: this._spells = data.spells
		this._spellSlots = new Map<number, SpellSlots>(data.spellSlots)
	}
}
