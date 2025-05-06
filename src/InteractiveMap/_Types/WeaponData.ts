import { DicesRollFormula } from '../../DiceRoller/_Types/DicesRollFormula'
import { WeaponType } from './WeaponType'

export type WeaponData = {
	id: string // Must be ALWAYS 'weapon'
	name: string
	type: WeaponType
	description: string
	isRanged: boolean
	damageFormula: DicesRollFormula
}
