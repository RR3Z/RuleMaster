import { Background } from '../_Enums/Background.ts'
import { Class } from '../_Enums/Class.ts'
import { Race } from '../_Enums/Race.ts'
import { Skill } from '../_Enums/Skill.ts'
import { Stat } from '../_Enums/Stat.ts'
import { SpellSlots } from './Spell.ts'

// Player Data (LOGIC)
export type PlayerData = {
	name: string
	mainInfo: PlayerMainInfo
	stats: [Stat, number][]
	savingThrows: [Stat, SavingThrowData][]
	skills: [Skill, SkillData][]
	spells: string[]
	spellSlots: [number, SpellSlots][] // Level, SpellSlots data
	items: string[]
}

export type PlayerMainInfo = {
	level: number
	class: Class
	race: Race
	background: Background
	maxHealth: number
	defenceClass: number
}

// Enemy Data (LOGIC)
export type EnemyData = {
	name: string
	mainInfo: EnemyMainInfo
	stats: Map<Stat, number>
	savingThrows: Map<Stat, SavingThrowData>
	spells: string[]
	spellSlots: Map<number, SpellSlots>
	items: string[]
}

export type EnemyMainInfo = {
	class: Class | undefined
	race: Race
	maxHealth: number
	defenceClass: number
}

// General Data (LOGIC)
export type SkillData = {
	value: number
	hasIt: boolean
}

export type SavingThrowData = {
	value: number
	hasIt: boolean
}

// Characters Data (VISUAL)
export type CharacterVisualData = {
	x: number
	y: number
	picture: string
}
