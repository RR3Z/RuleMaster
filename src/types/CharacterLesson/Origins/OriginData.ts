import { InstrumentData } from '../Instruments/InstrumentData'
import { Skill } from '../Skills/Skill'
import { Origin } from './Origin'

export type OriginData = {
	id: Origin
	link: string
	name: string
	description: string
	features: string
	skills: Skill[]
	instruments: (InstrumentData & { isChosable: boolean })[]
	equipment: string
	languages: string[]
}
