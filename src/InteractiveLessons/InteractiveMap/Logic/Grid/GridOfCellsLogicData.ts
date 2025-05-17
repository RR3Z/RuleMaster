import { Position } from '@/InteractiveLessons/Types/Position'
import { CharacterLogicData } from '../../../Entities/Character/CharacterLogicData'

export type GridOfCellsLogicData = {
	sizes: { width: number; height: number }
	player: CharacterLogicData
	boundaries: Position[]
}
