import { CalculatedCharacteristics } from '../../Characteristics/CalculatedCharacteristics.ts'
import { Skills } from '../../Characteristics/Skills.ts'
import { Stats } from '../../Characteristics/Stats.ts'

export type CharacterCharacteristics = {
	hp: number
	armourClass: number
	skills: Skills
	stats: Stats
} & CalculatedCharacteristics
