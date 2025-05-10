import { CharacteristicData } from '../Characteristics/CharacteristicData'
import { InstrumentData } from '../Instruments/InstrumentData'
import { TraitData } from '../TraitData'
import { Race } from './Race'

export type RaceData = {
	id: Race
	name: string
	description: string
	features: string
	link: string
	image: string
	imageAlt: string
	characteristics: CharacteristicData[]
	speed: number
	traits: TraitData[]
	languages: string[]
	instruments: InstrumentData[]
}
