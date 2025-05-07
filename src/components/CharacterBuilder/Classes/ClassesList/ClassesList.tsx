import { DNDClass } from '@/types/CharacterBuilder/DNDClass'
import { ClassData } from '@/types/CharacterBuilder/Steps/ClassData'
import Image from 'next/image'
import { useRef, useState } from 'react'
import ClassButton from '../ClassButton'
import {
	ClassDescription,
	ClassFeatures,
	ClassGeneralInfo,
	ClassTitle,
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
					onClick={() => handleClassClick(classData)}
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
					<ClassGeneralInfo>
						<div>
							<ClassTitle>{selectedClassData?.name}</ClassTitle>
							<ClassDescription>
								{selectedClassData?.description}
							</ClassDescription>
							<ClassFeatures>
								<span>
									<b>Основная характеристика: </b>
									{selectedClassData?.primalAbility}
								</span>
								<span>
									<b>Кость здоровья: </b>
									{selectedClassData?.hitPointDice}
								</span>
								<span>
									<b>Спасброски: </b>
									{selectedClassData?.savingThrows}
								</span>
							</ClassFeatures>
						</div>
						<Image
							src={selectedClassData?.image || '/Images/noImage.webp'}
							alt={selectedClassData?.imageAlt || 'no-image'}
							width={100}
							height={100}
							style={{ objectFit: 'contain' }}
							priority
						/>
					</ClassGeneralInfo>

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
