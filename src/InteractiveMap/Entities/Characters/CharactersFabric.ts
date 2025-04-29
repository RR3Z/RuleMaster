import { CharacterLogicData } from '../../_Types/CharacterLogicData'
import { GameType } from '../../_Types/GameType'
import { EntityType } from '../EntityType'
import DNDCharacter from './DNDCharacter'

export default class CharactersFabric {
	public createPlayer(gameType: GameType, data: CharacterLogicData) {
		switch (gameType) {
			case GameType.DND:
				return new DNDCharacter(EntityType.PLAYER, data)
			default:
				throw new Error('CharactersFabric -> createPlayer(): Unknown GameType!')
		}
	}
}
