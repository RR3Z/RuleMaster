import { StatType } from '../_Types/StatType'

export default class DNDStatsManager {
	private _stats: Map<StatType, number>

	constructor(stats?: Map<StatType, number>) {
		this._stats = new Map()
		this._stats.set(StatType.STRENGTH, 0)
		this._stats.set(StatType.DEXTERITY, 0)
		this._stats.set(StatType.CHARISMA, 0)
		this._stats.set(StatType.CONSTITUTION, 0)
		this._stats.set(StatType.INTELLIGENCE, 0)
		this._stats.set(StatType.WISDOM, 0)

		if (stats)
			for (const [key, value] of stats.entries()) this._stats.set(key, value)
	}

	public stat(statType: StatType): number {
		if (this._stats.get(statType) === undefined)
			throw new Error('DNDStatsManager -> stat(): Unknown Stat Type!')

		return this._stats.get(statType)!
	}

	public statModifier(statType: StatType): number {
		if (this._stats.get(statType) === undefined)
			throw new Error('DNDStatsManager -> statModifier(): Unknown Stat Type!')

		return Math.floor((this._stats.get(statType)! - 10) / 2)
	}
}
