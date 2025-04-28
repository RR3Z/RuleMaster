import Player from '../Entities/Player'

export default abstract class MapModel {
	protected _player: Player

	constructor(player: Player) {
		this._player = player
	}

	public get player(): Readonly<Player> {
		return this._player
	}
}
