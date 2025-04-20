import { EnemyData } from '../_Types/Characters.ts'
import { MapLogicData, Position } from '../_Types/Map.ts'
import Character from './Entities/Characters/Character.ts'
import Enemy from './Entities/Characters/Enemy.ts'
import Player from './Entities/Characters/Player.ts'
import AStarPathFinder from './Map/AStarPathFinder/AStarPathFinder.ts'
import Grid from './Map/Grid.ts'

export default class GameModel {
	// Fields
	public readonly player: Player
	public readonly enemies: Set<Enemy>
	private _pathFinder: AStarPathFinder
	private _grid: Grid

	constructor(data: MapLogicData) {
		this._pathFinder = new AStarPathFinder()
		this._grid = new Grid(data.grid)
		this.player = new Player(data.player)

		this.enemies = new Set<Enemy>()
		data.enemies.forEach((data: EnemyData) => {
			this.enemies.add(new Enemy(data))
		})
	}
	}
}
