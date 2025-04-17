import { SpellSlots } from '../../Spell/Spell.ts'
import { Class, Race, SavingThrowData, Stat } from './Character.d'

export interface EnemyData {
	name: string
	mainInfo: EnemyMainInfo
	stats: Map<Stat, number>
	savingThrows: Map<Stat, SavingThrowData>
	spells: string[]
	spellSlots: Map<number, SpellSlots>
	items: string[]
}

export interface EnemyMainInfo {
	class: Class | undefined
	race: Race
	maxHealth: number
	defenceClass: number
}
