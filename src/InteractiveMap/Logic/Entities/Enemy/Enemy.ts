import CharacteristicsCalculator from '../../Calculators/CharacteristicsCalculator.ts'
import Entity from '../Entity.ts'
import { EntityType } from '../EntityType.ts'
import { EnemyCharacteristics } from './EnemyCharacteristics.ts'

export default class Enemy extends Entity {
	private _characteristics: EnemyCharacteristics

	constructor(characteristics: EnemyCharacteristics) {
		super()

		this._type = EntityType.ENEMY

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
