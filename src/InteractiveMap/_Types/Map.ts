import { EntityType } from '../_Enums/EntityType.ts'
import { CharacterVisualData, EnemyData, PlayerData } from './Characters.ts'

export type MapData = {
	logic: MapLogicData
	visual: MapVisualData
}

export type MapLogicData = {
	grid: GridData
}

export type MapVisualData = {
	grid: GridVisualData
	player: CharacterVisualData
	enemies: CharacterVisualData[]
}

// Grid Data (LOGIC)
export type GridData = {
	width: number
	height: number
	cells: CellData[]
}

export type CellData = {
	x: number
	y: number
	content: CellContentData
}

export type CellContentData = {
	type: EntityType | undefined
	data: PlayerData | EnemyData | undefined
}

// Grid Data (VISUAL)
export type GridVisualData = {
	width: number
	height: number
	cells: CellVisualData[]
	picture: string
}

export type CellVisualData = {
	x: number
	y: number
	type: EntityType | undefined
	color: number | undefined
}
