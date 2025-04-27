import Character from './Character'
import { EntityType } from './EntityType'

export default class Enemy extends Character {
	constructor() {
		super(EntityType.CHARACTER)
	}
}
