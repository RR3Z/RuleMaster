import { EnemyData } from './Entities/Characters/Enemy.d'
import { PlayerData } from './Entities/Characters/Player.d'
import AStarPathFinder, {
	PathFinderData,
} from './Map/AStarPathFinder/AStarPathFinder.ts'
import Grid, { GridData } from './Map/Grid.ts'

export interface MapData {
	grid: GridData
	player: PlayerData
	enemies: EnemyData[]
}

export default class GameModel {
	private _grid: Grid
	private _pathFinder: AStarPathFinder

	constructor(data: MapData, pathFinderData: PathFinderData) {
		this._grid = new Grid(data.grid)
		this._pathFinder = new AStarPathFinder(pathFinderData)
	}
}
