import { CharacterLogicData } from './CharacterLogicData'
import { GridSizes } from './GridSizes'
import { Position } from './Position'

export type GridOfCellsLogicData = {
	sizes: GridSizes
	player: CharacterLogicData
	walls: Position[]
}
