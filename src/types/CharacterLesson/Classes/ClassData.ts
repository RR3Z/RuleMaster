import { DNDClass } from '../DNDClass'
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
}
