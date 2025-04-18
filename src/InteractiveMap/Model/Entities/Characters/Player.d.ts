import { SpellSlots } from '../../Spells/Spell.ts'
import {
	Class,
	Race,
	SavingThrowData,
	Skill,
	SkillData,
	Stat,
} from './Character.d'

export enum Background {
	ENTERTAINER,
	SAILOR,
	PIRATE,
	OUTLANDER,
	URCHIN,
	SAGE,
	CRIMINAL,
	CHARLATAN,
	NOBLE,
	FOLK_HERO,
	ACOLYTE,
	GUILD_ARTISAN,
	HERMIT,
	SOLDIER,
}

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
