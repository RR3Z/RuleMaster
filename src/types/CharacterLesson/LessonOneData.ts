import { ClassData } from './Classes/ClassData'
import { InstrumentData } from './Instruments/InstrumentData'
import { OriginData } from './Origins/OriginData'
import { RaceData } from './Races/RaceData'
import { SkillData } from './Skills/SkillData'
import { TextData } from './Steps/TextData'

export type LessonOneData = {
	introduction: TextData[]
	levelExplanation: TextData[]
	raceExplanation: TextData[]
	racesData: RaceData[]
	originExplanation: TextData[]
	originsData: OriginData[]
	classExplanation: TextData[]
	classesData: ClassData[]
	skillsExplanation: TextData[]
	skillsData: SkillData[]
	instrumentsExplanation: TextData[]
	instrumentsData: InstrumentData[]
}
