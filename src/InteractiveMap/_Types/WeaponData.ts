import { DicesRollFormula } from '../../DiceRoller/_Types/DicesRollFormula'
import { WeaponDescriptor } from './WeaponDescriptor'
import { WeaponType } from './WeaponType'

export type WeaponData = {
	id: string // Must be ALWAYS 'weapon'
	descriptors: WeaponDescriptor[]
	name: string
	type: WeaponType
	description: string
	isRanged: boolean
	damageFormula: DicesRollFormula
	attackRange: number
}
