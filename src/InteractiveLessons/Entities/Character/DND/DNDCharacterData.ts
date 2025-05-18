import { DNDItemData } from '@/InteractiveLessons/EquipmentManager/DND/DNDItemData'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
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
	proficiencies: Set<DNDStatType>
	equipment?: DNDItemData[]
	startState: DNDCharacterState
}
