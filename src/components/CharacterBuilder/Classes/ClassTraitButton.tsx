import { ClassTraitData } from '@/types/CharacterBuilder/ClassTraitData'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
`

const Button = styled.button<{ $isOpened: boolean }>`
	position: relative;
	cursor: pointer;
	border: none;
	background: none;
	width: 100%;
	min-height: 40px;
	padding: 0px;
	align-items: center;
	background: ${({ $isOpened }) => ($isOpened ? '#4a5872' : '#364156')};
	border: 1px solid #6d788b;
	transition: background 0.3s ease;
`

const ButtonText = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 5px 15px;
`

const ButtonLeftText = styled.div`
	display: flex;
	flex-direction: column;
`

const ButtonTitle = styled.span`
	font-size: 1rem;
	align-self: flex-start;
`

const ButtonSubtitle = styled.span`
	font-size: 0.8rem;
	align-self: flex-start;
	color: #b4b4b4;
`

const Content = styled.div<{ $isVisible: boolean }>`
	display: ${props => (props.$isVisible ? 'block' : 'none')};
	width: 98%;
	background: #364156;
	border: 1px solid #6d788b;
	border-top: none;
	padding: 10px 15px;
	font-size: 0.85rem;
`

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
	transition: transform 0.3s ease;
	transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`

type ClassTraitButtonProps = {
	data: ClassTraitData
}

export default function ClassTraitButton({ data }: ClassTraitButtonProps) {
	const [isOpened, setOpenedState] = useState(true)

	const toggleContent = () => {
		setOpenedState(prevState => !prevState)
	}

	return (
		<MainContainer>
			<Button $isOpened={isOpened} onClick={toggleContent}>
				<ButtonText>
					<ButtonLeftText>
						<ButtonTitle>{data.name}</ButtonTitle>
						<ButtonSubtitle>{data.level}</ButtonSubtitle>
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
