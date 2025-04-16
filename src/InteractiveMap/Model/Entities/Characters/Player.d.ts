import { SpellSlots } from '../../Spell/Spell.ts'
import { Class, Skill, Stat } from './Character.ts'
import { Background, Race } from './Player.ts'

export interface PlayerData {
	name: string
	mainInfo: PlayerMainInfo
	stats: Map<Stat, number>
	savingThrows: Map<Stat, SavingThrowData>
	skills: Map<Skill, SkillData>
	spells: string[]
	spellSlots: Map<number, SpellSlots> // Level, SpellSlots data
	items: string[]
}

export interface PlayerMainInfo {
	level: number
	class: Class
	race: Race
	background: Background
	maxHealth: number
	defenceClass: number
}

export interface SavingThrowData {
	value: number
	hasIt: boolean
}

export interface SkillData {
	value: number
	hasIt: boolean
}
