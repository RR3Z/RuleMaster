import { EnemyData } from '../_Types/Characters.ts'
import { MapLogicData, Position } from '../_Types/Map.ts'
import AStarPathFinder from './AStarPathFinder/AStarPathFinder.ts'
import Character from './Entities/Characters/Character.ts'
import Enemy from './Entities/Characters/Enemy.ts'
import Player from './Entities/Characters/Player.ts'
import Cell from './Map/Cell.ts'
import Grid from './Map/Grid.ts'
import TriggersManager from './Triggers/TriggersManager.ts'
import TutorialManager from './Tutorials/TutorialManager.ts'

export default class GameModel {
	// Fields
	public readonly player: Player
	public readonly enemies: Set<Enemy>
	public readonly tutorialManager: TutorialManager
	private _grid: Grid
	private _pathFinder: AStarPathFinder
	private _triggersManager: TriggersManager

	constructor(data: MapLogicData) {
		this.player = new Player(data.player)
		this._grid = new Grid(data.grid, this.player)
		this._pathFinder = new AStarPathFinder()
		this._triggersManager = new TriggersManager(data.triggers, this.player)
		this.tutorialManager = new TutorialManager(
			data.tutorial,
			this._triggersManager.triggers
		)
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
