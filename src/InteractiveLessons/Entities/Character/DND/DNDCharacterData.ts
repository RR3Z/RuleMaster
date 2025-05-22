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
	maxSpellSlots: [number, number][]
	stats: [DNDStatType, number][]
	savingThrowProficiencies: DNDStatType[]
	spells: DNDSpellData[]
	equipment?: DNDItemData[]
}
