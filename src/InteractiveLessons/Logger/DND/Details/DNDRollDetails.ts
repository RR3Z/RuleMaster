import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'

export type DNDRollDetails = {
	formulas: DiceRollerFormula[]
	results: DiceRollerResult[]
}
