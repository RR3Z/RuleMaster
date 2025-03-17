import CharacteristicsCalculator from '../../Calculators/CharacteristicsCalculator.ts'
import Entity from '../Entity.ts'
import { EntityType } from '../EntityType.ts'
import { CharacterCharacteristics } from './CharacterCharacteristics.ts'

export default class Character extends Entity {
	private _characteristics: CharacterCharacteristics

	constructor(characteristics: CharacterCharacteristics) {
		super()

		this._type = EntityType.CHARACTER

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
