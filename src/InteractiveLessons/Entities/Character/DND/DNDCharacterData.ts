import { DNDItemData } from '@/InteractiveLessons/EquipmentManager/DND/DNDItemData'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { DNDClass } from './DNDClass'

export type DNDCharacterData = {
	type: 'DND'
	name: string
	class: DNDClass
	level: number
	maxHealth: number
	maxMovementSpeed: number
	maxSpellSlots: Map<number, number>
	// TODO: spells:Set<>
	stats: Map<DNDStatType, number>
	savingThrowProficiencies: Set<DNDStatType>
	equipment?: DNDItemData[]
}
