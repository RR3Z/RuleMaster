import { CharacterData } from '@/types/CharacterData'
import { Characteristic } from '@/types/CharacterLesson/Characteristics/Characteristic'
import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { RaceData } from '@/types/CharacterLesson/Races/RaceData'
import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import styled from 'styled-components'
import ExportCharacterButton from './ExportCharacterButton'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 10px;
`

const Text = styled.div`
	display: block;
	font-size: 1rem;
	font-weight: 400;

	ul {
		padding-left: 1.2em;
		list-style-type: disc;
	}

	@media (max-width: 2560px) {
		font-size: 1.7rem;
	}

	@media (max-width: 1920px) {
		font-size: 1rem;
	}

	@media (max-width: 1280px) {
		font-size: 1rem;
	}

	@media (max-width: 1024px) {
		font-size: 0.9rem;
	}
`

type Props = {
	clazz: ClassData
	race: RaceData
	origin: OriginData
	name: string
	level: number
	instrumentsMastery: Instrument[]
	skillsMastery: Skill[]
	characteristics: Map<Characteristic, number | undefined>
}

export default function EndComponent({
	clazz,
	race,
	origin,
	name,
	level,
	instrumentsMastery,
	skillsMastery,
	characteristics,
}: Props) {
	const skillToCharacteristic: Record<Skill, Characteristic> = {
		[Skill.ACROBATICS]: Characteristic.AGILITY,
		[Skill.ANIMAL_HANDLING]: Characteristic.WISDOM,
		[Skill.ARCANA]: Characteristic.INTELLIGENCE,
		[Skill.ATHLETICS]: Characteristic.STRENGTH,
		[Skill.DECEPTION]: Characteristic.CHARISMA,
		[Skill.HISTORY]: Characteristic.INTELLIGENCE,
		[Skill.INSIGHT]: Characteristic.WISDOM,
		[Skill.INTIMIDATION]: Characteristic.CHARISMA,
		[Skill.INVESTIGATION]: Characteristic.INTELLIGENCE,
		[Skill.MEDICINE]: Characteristic.WISDOM,
		[Skill.NATURE]: Characteristic.INTELLIGENCE,
		[Skill.PERCEPTION]: Characteristic.WISDOM,
		[Skill.PERFORMANCE]: Characteristic.CHARISMA,
		[Skill.PERSUASION]: Characteristic.CHARISMA,
		[Skill.RELIGION]: Characteristic.INTELLIGENCE,
		[Skill.SLEIGHT_OF_HAND]: Characteristic.AGILITY,
		[Skill.STEALTH]: Characteristic.AGILITY,
		[Skill.SURVIVAL]: Characteristic.WISDOM,
		[Skill.ALL]: Characteristic.INTELLIGENCE, // FIXME: DO NOT USE IT
	}

	const getCharacteristicVals = () => {
		const characteristicVals: Map<Characteristic, number> = new Map()

		Object.values(Characteristic).forEach(char => {
			const val = characteristics.get(char as Characteristic)
			if (val !== undefined) characteristicVals.set(char as Characteristic, val)
			else characteristicVals.set(char as Characteristic, 0)
		})

		race.characteristics.forEach(({ type, value }) => {
			const current = characteristicVals.get(type) ?? 0
			characteristicVals.set(type, current + value)
		})

		return characteristicVals
	}

	const getCharacteristicMods = (
		characteristicVals: Map<Characteristic, number>
	) => {
		const characteristicsMods: Map<Characteristic, number> = new Map()

		characteristicVals.forEach((val, char) => {
			const mod = Math.floor((val - 10) / 2)
			characteristicsMods.set(char, mod)
		})

		return characteristicsMods
	}

	const getHPValue = (constitutionModifier: number) => {
		let modifier = constitutionModifier >= 0 ? constitutionModifier : 0

		switch (clazz.id) {
			case 'Bard':
				return 8 + modifier
		}
	}

	const getSkillsMasteries = () => {
		return [
			...skillsMastery,
			...clazz.skillsMasteries,
			...origin.skillsMasteries,
		]
	}

	const getSkillsVals = (
		bonusMastery: number,
		skillsMasteries: Skill[],
		characteristicMods: Map<Characteristic, number>
	) => {
		const skillsVals: Map<Skill, number> = new Map()

		Object.values(Skill).forEach(skill => {
			const modifier = characteristicMods.get(skillToCharacteristic[skill])
			if (skillsMasteries.includes(skill))
				skillsVals.set(skill, modifier! + bonusMastery)
			else skillsVals.set(skill, modifier!)
		})

		return skillsVals
	}

	const getInstrumentsMasteries = () => {
		const originInstrumentsMasteries = origin.instruments
			.filter(i => i.isChosable === false)
			.map(i => i.id)

		const instrumentsMasteries: Set<Instrument> = new Set([
			...race.instruments.map(instr => instr.id),
			...clazz.instrumentsMasteries,
			...instrumentsMastery,
			...originInstrumentsMasteries,
		])

		return Array.from(instrumentsMasteries)
	}

	const getSavingThrowsVals = (
		characteristicMods: Map<Characteristic, number>,
		savingThrowsMasteries: Characteristic[],
		bonusMastery: number
	) => {
		const vals: Map<Characteristic, number> = new Map()

		Object.values(Characteristic).forEach(characteristic => {
			const modifier = characteristicMods.get(characteristic)
			if (savingThrowsMasteries.includes(characteristic))
				vals.set(characteristic, modifier! + bonusMastery)
			else vals.set(characteristic, modifier!)
		})

		return vals
	}

	const assembleCharacterData = () => {
		const bonusMastery: number = 2
		const characteristicVals: Map<Characteristic, number> =
			getCharacteristicVals()
		const characteristicMods: Map<Characteristic, number> =
			getCharacteristicMods(characteristicVals)
		const maxHP: number = getHPValue(
			characteristicMods.get(Characteristic.CONSTITUTION)!
		)!
		const skillsMasteries: Skill[] = getSkillsMasteries()
		const skillsVals: Map<Skill, number> = getSkillsVals(
			bonusMastery,
			skillsMasteries,
			characteristicMods
		)
		const instrumentsMasteries: Instrument[] = getInstrumentsMasteries()
		const savingThrowsVals: Map<Characteristic, number> = getSavingThrowsVals(
			characteristicMods,
			clazz.savingThrowsMasteries,
			bonusMastery
		)

		const data: CharacterData = {
			name: name,
			level: level,
			className: clazz.name,
			originName: origin.name,
			raceName: race.name,
			maxHP: maxHP,
			bonusMastery: bonusMastery,
			characteristicVals: characteristicVals,
			characteristicMods: characteristicMods,
			speed: race.speed,
			armourMasteries: clazz.armourMasteries,
			weaponMasteries: clazz.weaponMasteries,
			skillsMasteries: skillsMasteries,
			skillsVals: skillsVals,
			instrumentsMasteries: instrumentsMasteries,
			savingThrowsMasteries: clazz.savingThrowsMasteries,
			savingThrowsVals: savingThrowsVals,
		}

		return data
	}

	return (
		<MainContainer>
			<Text>
				После создания персонажа вы можете экспортировать своего персонажа для
				печати (кнопка "Лист персонажа (PDF)").
				<br />
				<br />
				Также при нажатии на кнопку "Завершить", надо пройти тестирование, чтобы
				понять насколько хорошо вы усвоили информацию из этого урока.
			</Text>
			<ExportCharacterButton characterData={assembleCharacterData()} />
		</MainContainer>
	)
}
