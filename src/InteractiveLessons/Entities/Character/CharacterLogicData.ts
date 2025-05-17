import { Position } from '@/InteractiveLessons/Types/Position'
import { DNDCharacterData } from './DND/DNDCharacterData'

export type CharacterLogicData = {
	name: string
	startPos: Position
	data: DNDCharacterData
}
