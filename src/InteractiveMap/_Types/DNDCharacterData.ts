import { ItemData } from './ItemData'
import { StatType } from './StatType'

export type DNDCharacterData = {
	items: ItemData[]
	stats: [StatType, number][]
	proficiency: number
	maxHealth: number
	maxMovementDistance: number
	defenceClass: number
}
