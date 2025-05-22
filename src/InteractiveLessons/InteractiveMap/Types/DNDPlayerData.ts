import { DNDCharacterData } from '@/InteractiveLessons/Entities/Character/DND/DNDCharacterData'
import { DNDCharacterState } from '@/InteractiveLessons/StateMachine/Character/DND/DNDCharacterState'
import { Position } from '@/InteractiveLessons/Types/Position'

export type DNDPlayerData = {
	type: 'DND'
	data: DNDCharacterData
	startPos: Position
	startState: DNDCharacterState
}
