import Character from '@/InteractiveLessons/Entities/Character/Character'
import GridOfCells from '../../Logic/Grid/GridOfCells'
import GridOfCellsAreaHighlighter from '../AreaHighlighter/GridOfCellsAreaHighlighter'
import PlayerTrackingCamera from '../Camera/PlayerTrackingCamera'
import GridOfCellsVisual from '../Grid/GridOfCellsVisual'
import { GridOfCellsVisualData } from '../Grid/GridOfCellsVisualData'
import GridOfCellsVisualUtils from '../Grid/GridOfCellsVisualUtils'
import DraggableOnCellsToken from '../Tokens/DraggableOnCellsToken'
import Token from '../Tokens/Token'
import InteractiveMapVisualEngine from './InteractiveMapVisualEngine'

export default class GridOfCellsVisualEngine extends InteractiveMapVisualEngine {
	private readonly _data: GridOfCellsVisualData
	private readonly _gridLogic: GridOfCells

	private _player!: DraggableOnCellsToken
	private _enemyTokens: Map<string, Token>
	private _charactersVisualFilePaths: Map<string, string>
	private _gridOfCells!: GridOfCellsVisual
	private _areaHighlighter!: GridOfCellsAreaHighlighter
	private _visualUtils: GridOfCellsVisualUtils

	constructor(data: GridOfCellsVisualData, grid: GridOfCells) {
		super()

		this._charactersVisualFilePaths = new Map<string, string>()

		this._enemyTokens = new Map<string, Token>()
		this._data = data
		this._gridLogic = grid
		this._visualUtils = new GridOfCellsVisualUtils(grid.width, grid.height)
	}

	public get player(): DraggableOnCellsToken {
		return this._player
	}

	public get gridOfCellsVisual(): GridOfCellsVisual {
		return this._gridOfCells
	}

	public get areaHighlighter(): GridOfCellsAreaHighlighter {
		return this._areaHighlighter
	}

	public override async initialize(
		player: Character,
		enemies: Character[],
		playerVisualFilePath: string,
		enemiesVisualFilePaths: string[]
	): Promise<void> {
		await super.initialize(
			player,
			enemies,
			playerVisualFilePath,
			enemiesVisualFilePaths
		)

		// Camera
		const camera = new PlayerTrackingCamera(this.renderer)
		this.stage.addChild(camera)
		camera.addChild(this._sceneObjects)

		// Grid Of Cells
		this._gridOfCells = new GridOfCellsVisual(
			await this._visualUtils.loadSprite(this._data.gridBackgroundImg),
			this._data.cellVisual,
			this._gridLogic.width,
			this._gridLogic.height
		)
		this._sceneObjects.addChild(this._gridOfCells)

		// Area Highlighter
		this._areaHighlighter = new GridOfCellsAreaHighlighter({
			gridOfCellsVisual: this._gridOfCells,
			worldSpaceContainer: camera,
			visualUtils: this._visualUtils,
			cellPixelRadius: this._data.cellVisual.size / 2,
			gridWidth: this._gridLogic.width,
			gridHeight: this._gridLogic.height,
		})

		// Player
		this._player = new DraggableOnCellsToken({
			startPos: player.pos,
			radius: this._data.cellVisual.size / 2,
			worldSpaceContainer: camera,
			visualUtils: this._visualUtils,
			sprite: await this._visualUtils.loadSprite(playerVisualFilePath),
		})
		this._charactersVisualFilePaths.set(player.name, playerVisualFilePath)
		camera.target = this._player
		this._sceneObjects.addChild(this._player)

		// Enemies
		if (enemies.length > 0 && enemiesVisualFilePaths.length > 0) {
			for (let i = 0; i < enemies.length; i++) {
				const enemy = enemies[i]
				const enemyVisualFilePath =
					enemiesVisualFilePaths[i % enemiesVisualFilePaths.length] // Reuse paths if not enough

				const enemyToken = new Token({
					// Using base Token for non-draggable enemies
					startPos: enemy.pos,
					radius: this._data.cellVisual.size / 2,
					worldSpaceContainer: camera,
					sprite: await this._visualUtils.loadSprite(enemyVisualFilePath),
				})
				// Update visual position from grid coordinates
				const enemyPixelPos = this._visualUtils.coordinatesToPixelPosition(
					enemy.pos.x,
					enemy.pos.y,
					this._data.cellVisual.size / 2
				)
				enemyToken.position.set(enemyPixelPos.x, enemyPixelPos.y)

				enemyToken.interactive = false // Typically enemies are not player-interactive for dragging

				this._charactersVisualFilePaths.set(enemy.name, enemyVisualFilePath)
				this._enemyTokens.set(enemy.name, enemyToken) // Store token by enemy name
				this._sceneObjects.addChild(enemyToken)
			}
		}
	}

	public get charactersVisualFilePaths(): Map<string, string> {
		// Character name and path to his visual
		return this._charactersVisualFilePaths
	}
}
