import Character from '@/InteractiveLessons/Entities/Character/Character'
import { Position } from '@/InteractiveLessons/Types/Position'
import InteractiveMapPresenter from '../Presenter/InteractiveMapPresenter'
import InteractiveMapVisualEngine from '../Visual/Engine/InteractiveMapVisualEngine'

export default abstract class InteractiveMapView {
	protected _presenter!: InteractiveMapPresenter
	protected _visualEngine!: InteractiveMapVisualEngine

	public async initialize(
		player: Character,
		enemies: Character[],
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await this._visualEngine.initialize(
			player,
			enemies,
			playerVisualFilePath,
			enemiesVisualFilePath
		)
	}

	public get visualEngine(): InteractiveMapVisualEngine {
		return this._visualEngine
	}

	protected abstract onPresenterPlayerPosChange(pos: Position): void
}
