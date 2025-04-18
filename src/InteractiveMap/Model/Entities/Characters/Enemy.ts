import { EntityType } from '../Entity.ts'
import Character from './Character.ts'
import { EnemyData } from './Enemy.d'

export default class Enemy extends Character {
	// TODO:
	constructor(data: EnemyData) {
		super(EntityType.ENEMY)
	}
}
