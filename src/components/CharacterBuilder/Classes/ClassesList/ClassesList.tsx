import { DNDClass } from '@/types/CharacterBuilder/DNDClass'
import { ClassData } from '@/types/CharacterBuilder/Steps/ClassData'
import { useRef, useState } from 'react'
import ClassButton from '../ClassButton'
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogHeaderButton,
	FooterDialogAddButton,
	FooterDialogCloseButton,
	HorizontalLine,
} from './DialogStyles'

type ClassesListProps = {
	data: ClassData[]
	addClass: (className: DNDClass) => void
}

export default function ClassesList({ data, addClass }: ClassesListProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [selectedClassData, setSelectedClassData] = useState<ClassData>()

	const handleClassClick = (classData: ClassData) => {
		setSelectedClassData(classData)
		dialogRef.current?.showModal()
	}

	return (
		<>
			{data.map((classData: ClassData, index: number) => (
				<ClassButton
					key={index}
					image={classData.image}
					imageAlt={classData.imageAlt}
					name={classData.name}
					onClick={() => {
						handleClassClick(classData)
					}}
				></ClassButton>
			))}

			<Dialog ref={dialogRef} open={false}>
				<DialogHeader>
					Выбор класса
					<DialogHeaderButton onClick={() => dialogRef.current?.close()}>
						☓
					</DialogHeaderButton>
				</DialogHeader>
				<DialogBody>
					<div>
						<h4>{selectedClassData?.name}</h4>
						<span>{selectedClassData?.description}</span>
						<span>
							<br />
							<b>Основная характеристика: </b>
							{selectedClassData?.primalAbility}
						</span>
						<span>
							<br />
							<b>Кость здоровья: </b>
							{selectedClassData?.hitPointDice}
						</span>
						<span>
							<br />
							<b>Спасброски: </b>
							{selectedClassData?.savingThrows}
						</span>
					</div>
					<HorizontalLine />
				</DialogBody>
				<DialogFooter>
					<FooterDialogCloseButton onClick={() => dialogRef.current!.close()}>
						Отмена
					</FooterDialogCloseButton>
					<FooterDialogAddButton
						onClick={() => {
							dialogRef.current!.close()
							addClass(selectedClassData?.id as DNDClass)
						}}
					>
						Выбрать
					</FooterDialogAddButton>
				</DialogFooter>
			</Dialog>
		</>
	)
}
