import { Container } from 'pixi.js'
import { TokenVisualData } from '../../../_Types/Characters'
import Character from '../../../Model/Entities/Characters/Character.ts'
import Token from './Token.ts'

export default class EnemyToken extends Token {
	// Fields
	private _character: Character

	constructor(
		data: TokenVisualData,
		parent: Container,
		cellSize: number,
		character: Character
	) {
		super()

		this._parent = parent
		this._radius = cellSize / 2
		this._character = character

		this.init(data)
	}
}
