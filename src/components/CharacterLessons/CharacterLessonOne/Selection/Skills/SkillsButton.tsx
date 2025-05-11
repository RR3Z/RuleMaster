import { Skill } from '@/types/CharacterLesson/Skills/Skill'
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
import SkillsSelect from './SkillsSelect'

type Props = {
	values: Map<number, Skill>
	initialValue?: Skill
	addValue: (index: number, value: Skill) => void
	removeValue: (index: number, value: Skill) => void
	count: number
	title: string
	forWhat: string
	description: string
}

export default function SkillsButton({
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
					<SkillsSelect
						key={index}
						index={index + 1}
						placeholder='Выберите навык'
						values={values}
						initialValue={initialValue}
						addValue={addValue}
						removeValue={removeValue}
						updateButtonState={updateSelectedOptionsCount}
					/>
				))}
			</Content>
		</MainContainer>
	)
}
