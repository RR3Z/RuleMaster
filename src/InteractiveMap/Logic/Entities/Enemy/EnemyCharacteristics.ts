import { CalculatedCharacteristics } from '../../Characteristics/CalculatedCharacteristics.ts'
import { Stats } from '../../Characteristics/Stats.ts'

export type EnemyCharacteristics = {
	hp: number
	armourClass: number
	stats: Stats
} & CalculatedCharacteristics
