import { CharacterPosition } from '../_Types/Characters.ts'
import { MapVisualData, Position } from '../_Types/Map.ts'
import Enemy from '../Model/Entities/Characters/Enemy.ts'
import Player from '../Model/Entities/Characters/Player.ts'
import ViewModel from '../ViewModel/ViewModel.ts'
import VisualUtils from '../VisualUtils.ts'
import VisualEngine from './Visual/VisualEngine.ts'

export default class View {
	private _viewModel: ViewModel
	private _visualEngine: VisualEngine

	constructor(viewModel: ViewModel) {
		this._viewModel = viewModel
		this._visualEngine = new VisualEngine()
	}

	public async init(
		data: MapVisualData,
		player: Player,
		enemies: Set<Enemy>
	): Promise<void> {
		await this._visualEngine.init()
		this._visualEngine.initScene(data, player, enemies)

		// Notify ViewModel
		this._visualEngine.player.positionChanged$.subscribe(
			(data: CharacterPosition) =>
				this._viewModel.onCharacterPositionChanged(data)
		)

		// Listen ViewModel
		this._viewModel.playerPosition$.subscribe((pos: Position) =>
			this.onPlayerPositionChanged(pos)
		)
	}

	private onPlayerPositionChanged(data: Position): void {
		this._visualEngine.player.position = VisualUtils.coordinatesToPixelPosition(
			data.x,
			data.y,
			this._visualEngine.player.getBounds().width / 2
		)
	}
}
