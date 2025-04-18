import { SpellSlots } from '../../Spells/Spell.ts'
import { Class, Race, SavingThrowData, Stat } from './Character.d'

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
