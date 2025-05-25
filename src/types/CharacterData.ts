import { ArmourType } from './CharacterLesson/ArmourType'
import { Characteristic } from './CharacterLesson/Characteristics/Characteristic'
import { Instrument } from './CharacterLesson/Instruments/Instrument'
import { Skill } from './CharacterLesson/Skills/Skill'
import { WeaponType } from './CharacterLesson/WeaponType'

export type CharacterData = {
	name: string
	level: number
	className: string
	originName: string
	raceName: string
	maxHP: number
	bonusMastery: number
	characteristicVals: Map<Characteristic, number>
	characteristicMods: Map<Characteristic, number>
	savingThrowsVals: Map<Characteristic, number>
	savingThrowsMasteries: Characteristic[]
	armourMasteries: ArmourType[]
	speed: number
	skillsVals: Map<Skill, number>
	skillsMasteries: Skill[]
	instrumentsMasteries: Instrument[]
	weaponMasteries: WeaponType[]
}
