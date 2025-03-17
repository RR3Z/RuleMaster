import { Stats } from '../../Characteristics/Stats.ts'

export type EnemyCharacteristics = {
	hp: number
	armourClass: number
	stats: Stats
	statsModifiers?: Stats
	savingThrows?: Stats
}
