import AStarPathFinder, {
	PathFinderData,
} from './Map/AStarPathFinder/AStarPathFinder.ts'
import Grid, { GridData } from './Map/Grid.ts'

export type MapData = {
	grid: GridData
	pathFinder: PathFinderData
}

export default class GameModel {
	private _grid: Grid
	private _pathFinder: AStarPathFinder

	constructor(data: MapData) {
		this._grid = new Grid(data.grid)
		this._pathFinder = new AStarPathFinder(data.pathFinder)
	}
}
