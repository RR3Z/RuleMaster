import { ClassData } from '@/types/CharacterLesson/Classes/ClassData'
import { TraitData } from '@/types/CharacterLesson/TraitData'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { RefObject, useEffect, useState } from 'react'
import {
	Description,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogHeaderButton,
	DialogInner,
	Features,
	FooterDialogAddButton,
	FooterDialogCloseButton,
	GeneralInfo,
	GeneralLeft,
	HR,
	Img,
	Name,
	TraitsContainer,
} from '../DialogStyles'
import TraitButton from '../TraitButton'

type Props = {
	ref: RefObject<HTMLDialogElement | null>
	classData?: ClassData
	select: (data: ClassData) => void
}

export default function ClassDialog({ ref, classData, select }: Props) {
	const [data, setData] = useState<ClassData>()

	useEffect(() => {
		setData(classData)
	}, [classData])

	const handleCloseClick = () => {
		ref.current?.close()
	}
	const handleDeclineClick = () => {
		ref.current?.close()
	}
	const handleAcceptClick = () => {
		select(data!)
		ref.current?.close()
	}

	return (
		<Dialog ref={ref}>
			<DialogInner>
				<DialogHeader>
					Класс
					<DialogHeaderButton onClick={handleCloseClick}>
						<XIcon />
					</DialogHeaderButton>
				</DialogHeader>
				<DialogBody>
					<GeneralInfo>
						<GeneralLeft>
							<Name>{data?.name}</Name>
							<Description>{data?.description}</Description>
						</GeneralLeft>
						<Img>
							<Image
								src={data?.image || '/Images/noImage.webp'}
								alt={data?.imageAlt || 'no-image'}
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								style={{ objectFit: 'contain', objectPosition: 'top' }}
								priority
							/>
						</Img>
					</GeneralInfo>
					<Features
						dangerouslySetInnerHTML={{
							__html: data?.features || '',
						}}
					/>
					<HR />
					<TraitsContainer>
						{data?.traits.map((trait: TraitData, index: number) => (
							<TraitButton key={index} data={trait}></TraitButton>
						))}
					</TraitsContainer>
				</DialogBody>
				<DialogFooter>
					<FooterDialogCloseButton onClick={handleDeclineClick}>
						Отмена
					</FooterDialogCloseButton>
					<FooterDialogAddButton onClick={handleAcceptClick}>
						Выбрать
					</FooterDialogAddButton>
				</DialogFooter>
			</DialogInner>
		</Dialog>
	)
}
