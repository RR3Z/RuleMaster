import { DNDCharacterData } from './DNDCharacterData'
import { Position } from './Position'

export type CharacterLogicData = {
	name: string
	pos: Position
	data: DNDCharacterData // TODO: здесь можно добавлять разные типы данных
}
