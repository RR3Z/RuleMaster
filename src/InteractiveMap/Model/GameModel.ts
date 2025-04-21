import { EnemyData } from '../_Types/Characters.ts'
import { MapLogicData, Position } from '../_Types/Map.ts'
import Character from './Entities/Characters/Character.ts'
import Enemy from './Entities/Characters/Enemy.ts'
import Player from './Entities/Characters/Player.ts'
import AStarPathFinder from './Map/AStarPathFinder/AStarPathFinder.ts'
import Cell from './Map/Cell.ts'
import Grid from './Map/Grid.ts'

export default class GameModel {
	// Fields
	public readonly player: Player
	public readonly enemies: Set<Enemy>
	private _pathFinder: AStarPathFinder
	private _grid: Grid

	constructor(data: MapLogicData) {
		this._pathFinder = new AStarPathFinder()
		this.player = new Player(data.player)
		this._grid = new Grid(data.grid, this.player)

		this.enemies = new Set<Enemy>()
		data.enemies.forEach((data: EnemyData) => {
			this.enemies.add(new Enemy(data))
		})
	}

	public moveCharacterTo(character: Character, newPos: Position): void {
		const oldPos = character.position.value

		if (this._grid.cell(newPos.x, newPos.y).contentType !== undefined) {
			character.position.next({ x: oldPos.x, y: oldPos.y })
			return
		}

		const path: Cell[] = this._pathFinder.shortestPath(
			this._grid.cell(oldPos.x, oldPos.y),
			this._grid.cell(newPos.x, newPos.y)
		)

		let prevCell = this._grid.cell(oldPos.x, oldPos.y)
		for (const cell of path) {
			const content = prevCell.pullContent()

			if (content !== character)
				throw new Error('GameModel -> moveCharacterTo: smth went wrong!')

			cell.putContent(content)
			content.position.next({ x: cell.x, y: cell.y })

			prevCell = cell
		}
	}
}
