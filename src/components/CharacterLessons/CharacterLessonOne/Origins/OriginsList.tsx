import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import ListButton from '../../ListButton'
import SelectedItem from '../../SelectedItem'
import TextSection from '../../TextSection'
import OriginDialog from './OriginDialog'

const OriginsContainer = styled.div`
	width: 100%;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
`

const OriginsContainerInner = styled.div`
	overflow-y: auto;
	scrollbar-gutter: stable;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

type Props = {
	data: OriginData[]
	selectedOrigin?: OriginData
	selectOrigin: (origin?: OriginData) => void
}

export default function OriginsList({
	data,
	selectedOrigin,
	selectOrigin,
}: Props) {
	const [targetOrigin, setTargetOrigin] = useState<OriginData | undefined>(
		selectedOrigin
	)
	const [selectedOriginName, setSelectedOriginName] = useState<string>(
		selectedOrigin ? selectedOrigin.name : ''
	)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const handleOriginButtonClick = (data: OriginData) => {
		setTargetOrigin(data)
		dialogRef.current?.showModal()
	}
	const handleSelectOriginClick = (data: OriginData) => {
		selectOrigin(data)
		setSelectedOriginName(data.name)
	}
	const handleClearOriginChooseClick = () => {
		setTargetOrigin(undefined)
		setSelectedOriginName('')
		selectOrigin(undefined)
	}

	return (
		<>
			<TextSection
				data={{
					title: 'Выбор происхождения (предыстории)',
					text: 'Снизу представлен список происхождений (предысторий). Нажмите на одну из кнопок, чтобы увидеть особенности происхождения (предыстории).',
				}}
			/>

			<OriginsContainer>
				<OriginsContainerInner>
					{data.map((originData: OriginData, index: number) => (
						<ListButton
							key={index}
							image={undefined}
							imageAlt={undefined}
							text={originData.name}
							onClick={() => handleOriginButtonClick(originData)}
							activity={selectedOriginName === ''}
						/>
					))}
				</OriginsContainerInner>
			</OriginsContainer>

			{selectedOriginName !== '' ? (
				<SelectedItem
					text='Ваш выбор:'
					item={selectedOriginName!}
					onClick={handleClearOriginChooseClick}
				/>
			) : undefined}

			<OriginDialog
				ref={dialogRef}
				originData={targetOrigin}
				select={handleSelectOriginClick}
			/>
		</>
	)
}
