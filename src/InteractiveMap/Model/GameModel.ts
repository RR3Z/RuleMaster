import Grid from './Map/Grid.ts'

export default class GameModel {
	private _grid: Grid

	constructor(levelData: object) {
		this._grid = new Grid(5, 5)
	}
}
