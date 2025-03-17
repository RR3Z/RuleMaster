import { Stats } from '../Characteristics/Stats/Stats.ts'

export default class CharacteristicsCalculator {
	public static calculateStatsModifiers(stats: Stats): Stats {
		return {
			strength: Math.floor((stats.strength - 10) / 2),
			dexterity: Math.floor((stats.dexterity - 10) / 2),
			intelligence: Math.floor((stats.intelligence - 10) / 2),
			wisdom: Math.floor((stats.wisdom - 10) / 2),
			constitution: Math.floor((stats.constitution - 10) / 2),
			charisma: Math.floor((stats.charisma - 10) / 2),
		}
	}

	public static calculateSavingThrows(statsModifiers: Stats): Stats {
		return {
			strength: statsModifiers.strength,
			dexterity: statsModifiers.dexterity,
			intelligence: statsModifiers.intelligence,
			wisdom: statsModifiers.wisdom,
			constitution: statsModifiers.constitution,
			charisma: statsModifiers.charisma,
		}
	}
}
