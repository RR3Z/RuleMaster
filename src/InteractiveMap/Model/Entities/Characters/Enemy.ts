import { EntityType } from '../../../_Enums/EntityType.ts'
import { EnemyData } from '../../../_Types/Characters.ts'
import Character from './Character.ts'

export default class Enemy extends Character {
	// TODO:
	constructor(data: EnemyData) {
		super(EntityType.ENEMY)
	}
}
