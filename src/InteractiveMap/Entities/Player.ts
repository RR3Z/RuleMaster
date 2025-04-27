import Character from './Character'
import { EntityType } from './EntityType'

export default class Player extends Character {
	constructor() {
		super(EntityType.CHARACTER)
	}
}
