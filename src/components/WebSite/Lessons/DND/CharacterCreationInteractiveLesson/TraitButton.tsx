import { TraitData } from '@/types/CharacterLesson/TraitData'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
	Button,
	ButtonLeftText,
	ButtonSubtitle,
	ButtonText,
	ButtonTitle,
	ChevronIcon,
	Content,
	MainContainer,
} from './DropDownButtonStyles'
type Props = {
	data: TraitData
}

export default function TraitButton({ data }: Props) {
	const [isOpened, setOpenedState] = useState(true)

	const toggleContent = () => {
		setOpenedState(prevState => !prevState)
	}

	return (
		<MainContainer>
			<Button $isOpened={isOpened} onClick={toggleContent}>
				<ButtonText>
					<ButtonLeftText>
						<ButtonTitle>{data.title}</ButtonTitle>
						<ButtonSubtitle>{data.forWhat}</ButtonSubtitle>
					</ButtonLeftText>
					<ChevronIcon $isOpen={isOpened}>
						<ChevronDown />
					</ChevronIcon>
				</ButtonText>
			</Button>
			<Content
				$isVisible={isOpened}
				dangerouslySetInnerHTML={{ __html: data.description }}
			/>
		</MainContainer>
	)
}
