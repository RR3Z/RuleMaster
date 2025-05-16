import { DNDStatType } from './DNDStatType'

export default class DNDStatsManager {
	private _stats: Map<DNDStatType, number>
	private _proficiencies: Set<DNDStatType>

	constructor(
		stats: Map<DNDStatType, number>,
		proficiencies: Set<DNDStatType>
	) {
		this._stats = stats
		this.checkStats()

		this._proficiencies = proficiencies
	}

	public statValue(stat: DNDStatType): number {
		return this._stats.get(stat)!
	}

	public statModifier(stat: DNDStatType): number {
		return Math.floor((this._stats.get(stat)! - 10) / 2)
	}

	public hasProficiency(stat: DNDStatType): boolean {
		return this._proficiencies.has(stat)
	}

	// TODO:
	public attackModifier(): number {
		console.error(
			'DNDStatsManager -> attackModifier(): Need to implement this method!'
		)
		return -1
	}

	public initiativeModifier(): number {
		return this.statModifier(DNDStatType.DEXTERITY)
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
