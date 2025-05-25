import { OriginData } from '@/types/CharacterLesson/Origins/OriginData'
import { XIcon } from 'lucide-react'
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
	Name,
} from '../DialogStyles'

type Props = {
	ref: RefObject<HTMLDialogElement | null>
	originData?: OriginData
	select: (data: OriginData) => void
}

export default function OriginDialog({ ref, originData, select }: Props) {
	const [data, setData] = useState<OriginData>()

	useEffect(() => {
		setData(originData)
	}, [originData])

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
					Происхождение (предыстория)
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
					</GeneralInfo>
					<Features
						dangerouslySetInnerHTML={{
							__html: data?.features || '',
						}}
					/>
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
