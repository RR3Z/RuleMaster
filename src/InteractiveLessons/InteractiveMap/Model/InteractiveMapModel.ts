import ActionsManager from '@/InteractiveLessons/ActionsManager/ActionsManager'
import Character from '@/InteractiveLessons/Entities/Character/Character'

export default abstract class InteractiveMapModel {
	protected _actionsManager!: ActionsManager
	protected _player!: Character
	protected _enemies!: Character[]

	public get actionsManager(): ActionsManager {
		return this._actionsManager
	}

	public get player(): Character {
		return this._player
	}

	public get enemies(): Character[] {
		return this._enemies
	}
}
