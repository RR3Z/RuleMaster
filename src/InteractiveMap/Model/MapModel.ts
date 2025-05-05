import ActionsManager from '../ActionsManager/ActionsManager'
import Character from '../Entities/Characters/Character'

export default abstract class MapModel {
	protected _actionsManager!: ActionsManager
	protected _player!: Character

	public get actionsManager(): ActionsManager {
		return this._actionsManager
	}

	public get player(): Readonly<Character> {
		return this._player
	}
}
