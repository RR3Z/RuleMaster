import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import ListButton from '../ListButton'
import SelectedItem from '../SelectedItem'
import TextSection from '../TextSection'
import ClassDialog from './ClassDialog'

const ClassesContainer = styled.div`
	width: 100%;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
`

const ClassesContainerInner = styled.div`
	overflow-y: auto;
	scrollbar-gutter: stable;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

type Props = {
	data: ClassData[]
	selectedClass?: ClassData
	selectClass: (clazz?: ClassData) => void
}

export default function ClassesList({
	data,
	selectedClass,
	selectClass,
}: Props) {
	const [targetClass, setTargetClass] = useState<ClassData | undefined>(
		selectedClass
	)
	const [selectedClassName, setSelectedClassName] = useState<string>(
		selectedClass ? selectedClass.name : ''
	)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const handleClassButtonClick = (data: ClassData) => {
		setTargetClass(data)
		dialogRef.current?.showModal()
	}
	const handleSelectClassClick = (data: ClassData) => {
		selectClass(data)
		setSelectedClassName(data.name)
	}
	const handleClearClassChooseClick = () => {
		setTargetClass(undefined)
		setSelectedClassName('')
		selectClass(undefined)
	}

	return (
		<>
			<TextSection
				data={{
					title: 'Выбор класса',
					text: 'Снизу представлен список классов. Нажмите на одну из кнопок, чтобы увидеть особенности класса.',
				}}
			/>

			<ClassesContainer>
				<ClassesContainerInner>
					{data.map((classData: ClassData, index: number) => (
						<ListButton
							key={index}
							image={classData.image}
							imageAlt={classData.imageAlt}
							text={classData.name}
							onClick={() => handleClassButtonClick(classData)}
							activity={selectedClassName === ''}
						/>
					))}
				</ClassesContainerInner>
			</ClassesContainer>

			{selectedClassName !== '' ? (
				<SelectedItem
					text='Ваш выбор:'
					item={selectedClassName!}
					onClick={handleClearClassChooseClick}
				/>
			) : undefined}

			<ClassDialog
				ref={dialogRef}
				classData={targetClass}
				select={handleSelectClassClick}
			/>
		</>
	)
}
