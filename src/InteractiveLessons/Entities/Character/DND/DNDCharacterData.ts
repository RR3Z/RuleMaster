import { DNDItemData } from '@/InteractiveLessons/EquipmentManager/DND/DNDItemData'
import { DNDSpellData } from '@/InteractiveLessons/Spells/DND/DNDSpellData'
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
	stats: Map<DNDStatType, number>
	savingThrowProficiencies: Set<DNDStatType>
	spells: DNDSpellData[]
	equipment?: DNDItemData[]
}
