import { EntityType } from '../_Enums/EntityType.ts'
import { EnemyData, PlayerData, TokenVisualData } from './Characters.ts'
import { TriggerData } from './Triggers.ts'
import { TutorialStepData } from './Tutorials.ts'

export type Position = {
	x: number
	y: number
}

export type MapData = {
	logic: MapLogicData
	visual: MapVisualData
}

export type MapLogicData = {
	grid: GridData
	player: PlayerData
	enemies: EnemyData[]
	triggers: TriggerData[]
	tutorial: TutorialStepData[]
}

export type MapVisualData = {
	grid: GridVisualData
	player: TokenVisualData
	enemies: TokenVisualData[]
}

// Grid Data (LOGIC)
export type GridData = {
	width: number
	height: number
	boundaries: Position[]
}

// Grid Data (VISUAL)
export type GridVisualData = {
	width: number
	height: number
	cells: CellVisualData[]
	picture: string
}

export type CellVisualData = {
	pos: Position
	type: EntityType | undefined
	color: number | undefined
}
