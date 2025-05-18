import { DNDStatType } from './DNDStatType'

export default class DNDStatsManager {
	private _stats: Map<DNDStatType, number>
	private _savingThrowProficiencies: Set<DNDStatType>

	constructor(
		stats: Map<DNDStatType, number>,
		savingThrowProficiencies: Set<DNDStatType>
	) {
		this._stats = stats
		this.checkStats()

		this._savingThrowProficiencies = savingThrowProficiencies
	}

	public statValue(stat: DNDStatType): number {
		return this._stats.get(stat)!
	}

	public statModifier(stat: DNDStatType): number {
		return Math.floor((this._stats.get(stat)! - 10) / 2)
	}

	public haveSavingThrowProficiency(stat: DNDStatType): boolean {
		return this._savingThrowProficiencies.has(stat)
	}

	private checkStats(): void {
		const requiredStats = Object.values(DNDStatType)

		for (const stat of requiredStats) {
			if (!this._stats.has(stat)) {
				console.error(
					`DNDStatsManager -> checkStats(): Missing stat: ${stat}. Add this stat with value = 0.`
				)
				this._stats.set(stat, 0)
			}
		}
	}
}
