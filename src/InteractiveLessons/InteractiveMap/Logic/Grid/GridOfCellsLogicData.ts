import { Position } from '@/InteractiveLessons/Types/Position'
import { PlayerData } from '../../Types/PlayerData'

export type GridOfCellsLogicData = {
	sizes: { width: number; height: number }
	boundaries: Position[]
	player: PlayerData
	enemies: PlayerData[]
}
