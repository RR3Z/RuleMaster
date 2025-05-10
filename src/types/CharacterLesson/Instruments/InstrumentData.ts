import { Instrument } from './Instrument'
import { InstrumentType } from './InstrumentType'

export type InstrumentData = {
	type: InstrumentType
	instrument: Instrument
	name: string
}
