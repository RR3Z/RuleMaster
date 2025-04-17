import { EnemyData } from './Entities/Characters/Enemy.d'
import { PlayerData } from './Entities/Characters/Player.d'
import Grid, { GridData } from './Map/Grid.ts'

export interface MapData {
	grid: GridData
	player: PlayerData
	enemies: EnemyData[]
}

export default class GameModel {
	private _grid: Grid

	constructor(data: MapData) {
		this._grid = new Grid(data.grid)
	}
}
