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
} from '../../DropDownButtonStyles'
import { Selectors } from '../SelectStyles'
import MusicalInstrumentsSelect from './MusicalInstrumentsSelect'

type Props = {
	values: Map<number, Instrument>
	addValue: (index: number, value: Instrument) => void
	removeValue: (index: number, value: Instrument) => void
	count: number
	title: string
	forWhat: string
	description: string
}

export default function MusicalInstrumentsButton({
	values,
	addValue,
	removeValue,
	count,
	title,
	forWhat,
	description,
}: Props) {
	const [isOpened, setOpenedState] = useState<boolean>(false)
	const toggleContent = () => setOpenedState(prevState => !prevState)

	return (
		<MainContainer>
			<Button $isOpened={isOpened} onClick={toggleContent}>
				<StatusIndicator>
					{values.size === count ? <CheckIcon /> : <XIcon />}
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

				<Selectors>
					{Array.from({ length: count }).map((_, index) => (
						<MusicalInstrumentsSelect
							key={index}
							index={index}
							placeholder='Выберите музыкальный инструмент'
							values={values}
							initialValue={values.has(index) ? values.get(index) : undefined}
							addValue={addValue}
							removeValue={removeValue}
						/>
					))}
				</Selectors>
			</Content>
		</MainContainer>
	)
}
