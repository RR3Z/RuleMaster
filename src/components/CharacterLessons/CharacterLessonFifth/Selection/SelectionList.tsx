import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { InstrumentData } from '@/types/CharacterLesson/Instruments/InstrumentData'
import { InstrumentType } from '@/types/CharacterLesson/Instruments/InstrumentType'
import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextSection from '../../TextSection'
import { HR } from '../DialogStyles'
import MusicalInstrumentsButton from './MusicalInstruments/MusicalInstrumentsButton'
import SkillsButton from './Skills/SkillsButton'

const MainContainer = styled.div`
	width: 100%;
`

const ListContainer = styled.div`
	width: 100%;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
`

const ListContainerInner = styled.div`
	overflow-y: auto;
	scrollbar-gutter: stable;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

type Props = {
	clazz: ClassData
	origin: OriginData
	musicalInstruments: Map<number, Instrument>
	addMusicalInstrument: (index: number, value: Instrument) => void
	removeMusicalInstrument: (index: number, value: Instrument) => void
	skills: Map<number, Skill>
	addSkill: (index: number, value: Skill) => void
	removeSkill: (index: number, value: Skill) => void
}

export default function SelectionList({
	clazz,
	origin,
	musicalInstruments,
	addMusicalInstrument,
	removeMusicalInstrument,
	skills,
	addSkill,
	removeSkill,
}: Props) {
	const [
		musicalInstrumentsForOriginCount,
		setMusicalInstrumentsForOriginCount,
	] = useState<number>(0)
	const [musicalInstrumentsForClassCount, setMusicalInstrumentsForClassCount] =
		useState<number>(0)
	const [skillsForClassCount, setSkillsForClassCount] = useState<number>(0)

	useEffect(() => {
		// Musical Instruments
		const originMusicalCount = origin.instruments.filter(
			(instrument: InstrumentData & { isChosable: boolean }) =>
				instrument.isChosable
		).length
		setMusicalInstrumentsForOriginCount(originMusicalCount)

		const classMusicalCount = clazz.instrumentsChoice
			? clazz.instrumentsChoice.type.includes(InstrumentType.MUSICAL)
				? clazz.instrumentsChoice.count
				: 0
			: 0
		setMusicalInstrumentsForClassCount(classMusicalCount)

		// Skills
		const classSkillsCount = clazz.skillsChoice ? clazz.skillsChoice.count : 0
		setSkillsForClassCount(classSkillsCount)
	}, [origin, clazz])

	return (
		<MainContainer>
			<TextSection
				data={{
					title: 'Меню выбора',
					text: `Снизу представлен список того, что вам надо выбрать, чтобы создать персонажа. Это было выдано вам за:<ul><li><b>класс</b> (${clazz.name})</li><li><b>происхождение</b> (${origin.name})</li></ul>`,
				}}
			/>

			<HR />

			<ListContainer>
				<ListContainerInner>
					{skillsForClassCount > 0 && (
						<SkillsButton
							count={skillsForClassCount}
							title={'Выбор навыков'}
							forWhat={`За Класс`}
							description={`Вам надо выбрать Навыки, которыми вы владеете. Если какого-то навыка нет, значит вы уже владеете им. ${skillsForClassCount}`}
							values={skills}
							addValue={addSkill}
							removeValue={removeSkill}
							originSkills={origin.skillsMasteries}
						/>
					)}

					{musicalInstrumentsForOriginCount + musicalInstrumentsForClassCount >
						0 && (
						<MusicalInstrumentsButton
							count={
								musicalInstrumentsForOriginCount +
								musicalInstrumentsForClassCount
							}
							title={'Выбор музыкальных инструментов'}
							forWhat={`За ${[
								musicalInstrumentsForOriginCount > 0 && 'Происхождение',
								musicalInstrumentsForClassCount > 0 && 'Класс',
							]
								.filter(Boolean) // Убираем пустые значения
								.join(', ')}`}
							description={`Вам надо выбрать Музыкальные инструменты, которыми вы владеете. Если какого-то инструмента нет, значит вы уже умеете им пользоваться. ${
								musicalInstrumentsForOriginCount +
								musicalInstrumentsForClassCount
							}`}
							values={musicalInstruments}
							addValue={addMusicalInstrument}
							removeValue={removeMusicalInstrument}
						/>
					)}
				</ListContainerInner>
			</ListContainer>
		</MainContainer>
	)
}
