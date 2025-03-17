import { Characteristics } from '../Characteristics/Characteristics'
import Character from './Character'
import { EntityType } from './EntityType'

export default class Player extends Character {
	constructor(characteristics: Characteristics) {
		super(characteristics)

		this._type = EntityType.PLAYER
	}
}
