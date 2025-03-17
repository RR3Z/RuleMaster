import { Skills } from './Skills.ts'
import { Stat } from './Stats/Stat.ts'

export type Characteristics = {
	currentHP: number
	readonly maxHP: number
	armourClass: number
	skills: Skills
	stats: Stat[]
	statsModifiers?: Stat[]
	savingThrows?: Stat[]
}
