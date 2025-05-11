import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
	Button,
	ButtonLeftText,
	ButtonSubtitle,
	ButtonText,
	ButtonTitle,
	CheckIcon,
	ChevronIcon,
	Content,
	Description,
	MainContainer,
	StatusIndicator,
	XIcon,
} from '../../../DropDownButtonStyles'
import MusicalInstrumentsSelect from './MusicalInstrumentsSelect'

type Props = {
	values: Map<number, Instrument>
	initialValue?: Instrument
	addValue: (index: number, value: Instrument) => void
	removeValue: (index: number, value: Instrument) => void
	count: number
	title: string
	forWhat: string
	description: string
}

export default function MusicalInstrumentsButton({
	values,
	initialValue,
	addValue,
	removeValue,
	count,
	title,
	forWhat,
	description,
}: Props) {
	const [isOpened, setOpenedState] = useState<boolean>(false)
	const toggleContent = () => setOpenedState(prevState => !prevState)
	const [selectedOptionsCount, setSelectedOptionsCount] = useState<number>(0)
	const updateSelectedOptionsCount = (value: number) =>
		setSelectedOptionsCount(prev => prev + value)

	return (
		<MainContainer>
			<Button $isOpened={isOpened} onClick={toggleContent}>
				<StatusIndicator>
					{selectedOptionsCount === count ? <CheckIcon /> : <XIcon />}
				</StatusIndicator>
				<ButtonText>
					<ButtonLeftText>
						<ButtonTitle>{title}</ButtonTitle>
						<ButtonSubtitle>{forWhat}</ButtonSubtitle>
					</ButtonLeftText>
					<ChevronIcon $isOpen={isOpened}>
						<ChevronDown />
					</ChevronIcon>
				</ButtonText>
			</Button>
			<Content $isVisible={isOpened}>
				<Description dangerouslySetInnerHTML={{ __html: description }} />

				{Array.from({ length: count }).map((_, index) => (
					<MusicalInstrumentsSelect
						key={index}
						index={index + 1}
						placeholder='Выберите музыкальный инструмент'
						values={values as Map<number, Instrument>}
						initialValue={initialValue as Instrument}
						addValue={addValue}
						removeValue={removeValue}
						updateButtonState={updateSelectedOptionsCount}
					/>
				))}
			</Content>
		</MainContainer>
	)
}
