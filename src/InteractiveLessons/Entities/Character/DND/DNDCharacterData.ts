import { DNDItemData } from '@/InteractiveLessons/EquipmentManager/DND/DNDItemData'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'

export type DNDCharacterData = {
	maxHealth: number
	maxMovementSpeed: number
	maxSpellSlots: Map<number, number>
	// TODO: spells:Set<>
	stats: Map<DNDStatType, number>
	proficiencies: Set<DNDStatType>
	equipment?: DNDItemData[]
}
