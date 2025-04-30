import Character from '../Entities/Characters/Character'

export default abstract class MapModel {
	protected _player!: Character

	public get player(): Readonly<Character> {
		return this._player
	}
}
