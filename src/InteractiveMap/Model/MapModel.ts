import Player from '../Entities/Player'

export default abstract class MapModel {
	protected _player!: Player

	public get player(): Readonly<Player> {
		return this._player
	}
}
