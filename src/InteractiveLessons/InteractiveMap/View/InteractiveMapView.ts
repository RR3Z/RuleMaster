import { Position } from '@/InteractiveLessons/Types/Position'
import InteractiveMapPresenter from '../Presenter/InteractiveMapPresenter'
import InteractiveMapVisualEngine from '../Visual/Engine/InteractiveMapVisualEngine'

export default abstract class InteractiveMapView {
	protected _presenter!: InteractiveMapPresenter
	protected _visualEngine!: InteractiveMapVisualEngine

	public async initialize(
		playerPos: Position,
		playerVisualFilePath: string,
		enemiesVisualFilePath: string[]
	): Promise<void> {
		await this._visualEngine.initialize(
			playerPos,
			playerVisualFilePath,
			enemiesVisualFilePath
		)
	}

	public get visualEngine(): InteractiveMapVisualEngine {
		return this._visualEngine
	}

	protected abstract onViewModelPlayerPosChange(pos: Position): void
}
