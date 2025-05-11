import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { ChoiceType } from '@/types/CharacterLesson/Components/ChoiceType'
import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { InstrumentData } from '@/types/CharacterLesson/Instruments/InstrumentData'
import { InstrumentType } from '@/types/CharacterLesson/Instruments/InstrumentType'
import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextSection from '../../TextSection'
import { HR } from '../DialogStyles'
import SelectionButton from './SelectionButton'

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
	addMusicalInstrument: (index: number, instrument: Instrument) => void
	removeMusicalInstrument: (index: number, instrument: Instrument) => void
}

export default function SelectionList({
	clazz,
	origin,
	musicalInstruments,
	addMusicalInstrument,
	removeMusicalInstrument,
}: Props) {
	let counter = 0
	const [
		musicalInstrumentsForOriginCount,
		setMusicalInstrumentsForOriginCount,
	] = useState<number>(0)
	const [musicalInstrumentsForClassCount, setMusicalInstrumentsForClassCount] =
		useState<number>(0)

	useEffect(() => {
		// Musical Instruments
		const originMusicalCount = origin.instruments.filter(
			(instrument: InstrumentData & { isChosable: boolean }) =>
				instrument.isChosable
		).length
		setMusicalInstrumentsForOriginCount(originMusicalCount)

		const clazzMusicalCount = clazz.instrumentsChoice.reduce(
			(sum, instrument) => {
				return instrument.type === InstrumentType.MUSICAL
					? sum + instrument.count
					: sum
			},
			0
		)
		setMusicalInstrumentsForClassCount(clazzMusicalCount)
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
					{musicalInstrumentsForOriginCount + musicalInstrumentsForClassCount >
						0 && (
						<SelectionButton
							type={ChoiceType.MUSICAL_INSTRUMENTS}
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
							description={`Вам надо выбрать Музыкальные инструменты, которыми вы владеете. ${
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
