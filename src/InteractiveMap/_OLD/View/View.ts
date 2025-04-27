import { CharacterPosition } from '../_Types/Characters.ts'
import { MapVisualData, Position } from '../_Types/Map.ts'
import { MessageBoxData } from '../_Types/Tutorials.ts'
import Enemy from '../Model/Entities/Characters/Enemy.ts'
import Player from '../Model/Entities/Characters/Player.ts'
import ViewModel from '../ViewModel/ViewModel.ts'
import VisualUtils from '../VisualUtils.ts'
import MessageBox from './Visual/MessageBox/MessageBox.ts'
import VisualEngine from './Visual/VisualEngine.ts'

export default class View {
	private _viewModel: ViewModel
	private _mapVisualEngine: VisualEngine
	private _messageBox: MessageBox

	constructor(viewModel: ViewModel) {
		this._viewModel = viewModel
		this._mapVisualEngine = new VisualEngine()
		this._messageBox = new MessageBox()
	}

	public async init(
		data: MapVisualData,
		player: Player,
		enemies: Set<Enemy>
	): Promise<void> {
		await this._mapVisualEngine.init()
		this._mapVisualEngine.initScene(data, player, enemies)

		// Notify ViewModel
		this._mapVisualEngine.player.positionChanged$.subscribe(
			(data: CharacterPosition) =>
				this._viewModel.onCharacterPositionChanged(data)
		)
		this._messageBox.nextButton.addEventListener('click', () => {
			this._viewModel.onMessageBoxNextButtonClicked()
		})

		// Listen ViewModel
		this._viewModel.playerPosition$.subscribe((pos: Position) =>
			this.onPlayerPositionChanged(pos)
		)
		this._viewModel.messageBoxData$.subscribe((data: MessageBoxData) => {
			this.onMessageBoxDataChanged(data)
		})
	}

	private onPlayerPositionChanged(data: Position): void {
		this._mapVisualEngine.player.position =
			VisualUtils.coordinatesToPixelPosition(
				data.x,
				data.y,
				this._mapVisualEngine.player.getBounds().width / 2
			)
	}

	private onMessageBoxDataChanged(data: MessageBoxData): void {
		this._messageBox.updateData(data)
	}
}
