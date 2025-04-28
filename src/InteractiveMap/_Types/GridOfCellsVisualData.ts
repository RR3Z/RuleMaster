import { CellVisualData } from './CellVisualData'
import { CharacterVisualData } from './ChararcterVisualData'

export type GridOfCellsVisualData = {
	gridBackgroundImg: string
	cell: CellVisualData
	player: CharacterVisualData
}
