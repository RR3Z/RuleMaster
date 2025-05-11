import { DNDClass } from '../DNDClass'
import { InstrumentType } from '../Instruments/InstrumentType'
import { TraitData } from '../TraitData'

export type ClassData = {
	id: DNDClass
	name: string
	description: string
	features: string
	link: string
	image: string
	imageAlt: string
	traits: TraitData[]
	instrumentsChoice: { count: number; type: InstrumentType }[]
	skillsChoice: { count: number }[]
}
