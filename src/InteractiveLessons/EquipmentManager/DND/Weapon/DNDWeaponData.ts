import { DiceRollerFormula } from '@/InteractiveLessons/DiceRoller/DiceRollerFormula'
import { DNDWeaponDescriptor } from './DNDWeaponDescriptor'
import { DNDWeaponRangeType } from './DNDWeaponRangeType'
import { DNDWeaponType } from './DNDWeaponType'

export type DNDWeaponData = {
	type: DNDWeaponType
	name: string
	description: string
	rangeType: DNDWeaponRangeType
	defaultRange: number
	maxRange: number
	damageFormulas: DiceRollerFormula[]
	descriptors: DNDWeaponDescriptor[]
}
