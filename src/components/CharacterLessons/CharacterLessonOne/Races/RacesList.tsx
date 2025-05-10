import { RaceData } from '@/types/CharacterLesson/Races/RaceData'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import ListButton from '../../ListButton'
import SelectedItem from '../../SelectedItem'
import TextSection from '../../TextSection'
import RaceDialog from './RaceDialog'

const RacesContainer = styled.div`
	width: 100%;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
`

const RacesContainerInner = styled.div`
	overflow-y: auto;
	scrollbar-gutter: stable;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

type Props = {
	data: RaceData[]
	selectedRace?: RaceData
	selectRace: (race?: RaceData) => void
}

export default function RacesList({ data, selectedRace, selectRace }: Props) {
	const [targetRace, setTargetRace] = useState<RaceData | undefined>(
		selectedRace
	)
	const [selectedRaceName, setSelectedRaceName] = useState<string>(
		selectedRace ? selectedRace.name : ''
	)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const handleRaceButtonClick = (data: RaceData) => {
		setTargetRace(data)
		dialogRef.current?.showModal()
	}
	const handleSelectRaceClick = (data: RaceData) => {
		selectRace(data)
		setSelectedRaceName(data.name)
	}
	const handleClearRaceChooseClick = () => {
		setTargetRace(undefined)
		setSelectedRaceName('')
		selectRace(undefined)
	}

	return (
		<>
			<TextSection
				data={{
					title: 'Выбор расы',
					text: 'Снизу представлен список рас. Нажмите на одну из кнопок, чтобы увидеть особенности расы.',
				}}
			/>

			<RacesContainer>
				<RacesContainerInner>
					{data.map((raceData: RaceData, index: number) => (
						<ListButton
							key={index}
							image={raceData.image}
							imageAlt={raceData.imageAlt}
							text={raceData.name}
							onClick={() => handleRaceButtonClick(raceData)}
							activity={selectedRaceName === ''}
						/>
					))}
				</RacesContainerInner>
			</RacesContainer>

			{selectedRaceName !== '' ? (
				<SelectedItem
					text='Ваш выбор:'
					item={selectedRaceName!}
					onClick={handleClearRaceChooseClick}
				/>
			) : undefined}

			<RaceDialog
				ref={dialogRef}
				raceData={targetRace}
				select={handleSelectRaceClick}
			/>
		</>
	)
}
