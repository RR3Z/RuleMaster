import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DNDRollType } from './DNDRollType'
import { DNDSpellForm } from './DNDSpellForm'
import { DNDSpellType } from './DNDSpellType'

export type DNDSpellData = {
	type: DNDSpellType
	form: DNDSpellForm
	radius: number
	maxDistance: number
	rollType: DNDRollType
	rollsFormula: DiceRollerFormula[] | null
	isAttachedToCharacter: boolean
}
