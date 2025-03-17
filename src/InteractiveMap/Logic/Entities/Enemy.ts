import { Characteristics } from '../Characteristics/Characteristics.ts'
import Character from './Character.ts'
import { EntityType } from './EntityType.ts'

export default class Enemy extends Character {
	constructor(characteristics: Characteristics) {
		super(characteristics)

		this._type = EntityType.ENEMY
	}
}
