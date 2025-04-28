import { DNDCharacterData } from '../_Types/DNDCharacterData'
import { GridSizes } from '../_Types/GridSizes'
import { Position } from '../_Types/Position'

export type GridOfCellsLogicData = {
	gridSizes: GridSizes
	player: DNDCharacterData
	walls: Position[]
}
