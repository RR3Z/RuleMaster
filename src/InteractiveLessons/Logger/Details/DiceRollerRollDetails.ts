import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerFormula'
import { DiceRollerResult } from '@/InteractiveLessons/DiceRoller/Types/DiceRollerResult'

export type DiceRollerRollDetails = {
	formulas: DiceRollerFormula[]
	results: DiceRollerResult[]
}
