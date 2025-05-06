import { StatType } from '../../_Types/StatType'
import DNDStatsManager from '../../StatsManager/DNDStatsManager'

export default class DNDCharacterStats {
	private _stats: DNDStatsManager
	private _proficiency: number

	constructor(stats?: Map<StatType, number>, proficiency?: number) {
		if (stats) this._stats = new DNDStatsManager(stats)
		else this._stats = new DNDStatsManager()

		if (proficiency) this._proficiency = proficiency
		else this._proficiency = 0
	}

	public get proficiency(): number {
		return this._proficiency
	}

	public stat(statType: StatType): number {
		return this._stats.stat(statType)
	}

	public statModifier(statType: StatType): number {
		return this._stats.statModifier(statType)
	}
}
