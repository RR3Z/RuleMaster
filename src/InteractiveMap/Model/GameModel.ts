import { MapLogicData } from '../_Types/Map.ts'
import AStarPathFinder from './Map/AStarPathFinder/AStarPathFinder.ts'
import Grid from './Map/Grid.ts'

export default class GameModel {
	private _grid: Grid
	private _pathFinder: AStarPathFinder

	constructor(data: MapLogicData) {
		this._grid = new Grid(data.grid)
		this._pathFinder = new AStarPathFinder()
	}
}
