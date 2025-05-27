import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DNDStatType } from '@/InteractiveLessons/StatsManager/DNDStatType'
import { GeometricShape } from '@/InteractiveLessons/Types/GeometricShape'
import { DNDRollType } from './DNDRollType'
import { DNDSpellType } from './DNDSpellType'

export type DNDSpellData = {
	name: string
	type: DNDSpellType
	form: GeometricShape
	radius: number
	maxDistance: number
	rollType: DNDRollType
	savingThrowStat?: DNDStatType
	rollsFormula: DiceRollerFormula[] | null
	isAttachedToCharacter: boolean
	iconPath?: string
}
