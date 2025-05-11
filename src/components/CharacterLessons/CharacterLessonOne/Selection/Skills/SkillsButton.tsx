import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { Selectors } from '../SelectStyles'
import SkillsSelect from './SkillsSelect'

type Props = {
	values: Map<number, Skill>
	addValue: (index: number, value: Skill) => void
	removeValue: (index: number, value: Skill) => void
	count: number
	title: string
	forWhat: string
	description: string
}

export default function SkillsButton({
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

	useEffect(() => {}, [values])

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
						<SkillsSelect
							key={index}
							index={index}
							placeholder='Выберите навык'
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
