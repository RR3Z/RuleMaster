import { SpellSlots } from '../../Spell/Spell.ts'
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
