import CharacteristicsCalculator from '../Calculators/CharacteristicsCalculator.ts'
import { Characteristics } from '../Characteristics/Characteristics.ts'
import Entity from './Entity.ts'
import { EntityType } from './EntityType.ts'

export default class Character extends Entity {
	private _characteristics: Characteristics

	constructor(type: EntityType, characteristics: Characteristics) {
		super()

		if (type === EntityType.PLAYER || type === EntityType.ENEMY)
			this._type = type
		else this._type = EntityType.CHARACTER

		this._characteristics = characteristics
		if (!characteristics.statsModifiers)
			this._characteristics.statsModifiers =
				CharacteristicsCalculator.calculateStatsModifiers(
					this._characteristics.stats
				)
		if (!characteristics.savingThrows)
			this._characteristics.savingThrows =
				CharacteristicsCalculator.calculateSavingThrows(
					this._characteristics.statsModifiers!
				)
	}
}
