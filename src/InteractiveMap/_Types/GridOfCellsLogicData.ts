import { CharacterLogicData } from './CharacterLogicData'
import { GridSizes } from './GridSizes'
import { Position } from './Position'

export type GridOfCellsLogicData = {
	gridSizes: GridSizes
	player: CharacterLogicData
	walls: Position[]
}
