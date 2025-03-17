import { Skills } from './Skills.ts'
import { Stats } from './Stats.ts'

export type Characteristics = {
	hp: number
	armourClass: number
	skills: Skills
	stats: Stats
	statsModifiers?: Stats
	savingThrows?: Stats
}
