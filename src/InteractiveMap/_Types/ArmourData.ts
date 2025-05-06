import { ArmourType } from './ArmourType'

export type ArmourData = {
	id: string // Must be ALWAYS 'armour'
	name: string
	type: ArmourType
	description: string
	armourClass: number
}
