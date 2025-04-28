import { DNDCharacterData } from './DNDCharacterData'
import { GridSizes } from './GridSizes'
import { Position } from './Position'

export type GridOfCellsLogicData = {
	gridSizes: GridSizes
	player: DNDCharacterData
	walls: Position[]
}
