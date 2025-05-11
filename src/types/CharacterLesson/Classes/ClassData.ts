import { ArmourType } from '../ArmourType'
import { Characteristic } from '../Characteristics/Characteristic'
import { DNDClass } from '../DNDClass'
import { Instrument } from '../Instruments/Instrument'
import { InstrumentType } from '../Instruments/InstrumentType'
import { Skill } from '../Skills/Skill'
import { TraitData } from '../TraitData'
import { WeaponType } from '../WeaponType'

export type ClassData = {
	id: DNDClass
	image: string
	imageAlt: string
	link: string
	name: string
	description: string
	features: string
	traits: TraitData[]
	skillsChoice: {
		count: number
		skills: Skill[]
	}
	instrumentsChoice: { count: number; type: InstrumentType[] }
	instrumentsMasteries: Instrument[]
	armourMasteries: ArmourType[]
	weaponMasteries: WeaponType[]
	savingThrowsMasteries: Characteristic[]
	skillsMasteries: Skill[]
}
