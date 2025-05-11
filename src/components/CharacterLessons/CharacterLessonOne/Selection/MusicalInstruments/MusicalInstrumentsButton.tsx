import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { Check, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import MusicalInstrumentsSelect from './MusicalInstrumentsSelect'

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	padding: 10px 0px 0px 10px;
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
	font-weight: bold;
	align-self: flex-start;
`

const ButtonSubtitle = styled.span`
	font-size: 0.8rem;
	align-self: flex-start;
	color: #b4b4b4;
`

const Content = styled.div<{ $isVisible: boolean }>`
	display: ${props => (props.$isVisible ? 'flex' : 'none')};
	flex-direction: column;
	gap: 10px;
	width: 98%;
	background: #364156;
	border: 1px solid #6d788b;
	border-top: none;
	padding: 10px 15px;
	font-size: 0.85rem;

	a {
		color: #dd1f42;
		text-decoration: underline;
	}
`

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
	transition: transform 0.3s ease;
	transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`

const Description = styled.span`
	display: block;
	font-size: 0.9rem;
`

const StatusIndicator = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #2a3142;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(-50%, -50%);
	z-index: 2;
	border: 1px solid #151b28;
`

const CheckIcon = styled(Check)`
	width: 100%;
	height: 100%;
	color: #4caf50;
`

const XIcon = styled(X)`
	width: 100%;
	height: 100%;
	color: #f44336;
`

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
