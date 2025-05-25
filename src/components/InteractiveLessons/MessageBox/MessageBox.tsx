import { BookOpenText, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Overlay = styled.div<{ $isVisible: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	z-index: 999;
	padding: 20px;
`

const MessageBoxWrapper = styled.div`
	position: relative;
	background-color: #1c1c1c;
	color: #e0e0e0;
	padding: 25px;
	padding-top: 45px;
	border-radius: 3px;
	border: 2px solid #ff6b00;
	box-shadow: 0 0 15px rgba(255, 107, 0, 0.3);
	min-width: 300px;
	max-width: 550px;
	text-align: left;
	z-index: 1000;
	font-family: 'Arial', sans-serif;
`

const IconContainer = styled.div`
	position: absolute;
	top: -28px;
	left: 50%;
	transform: translateX(-50%);
	width: 56px;
	height: 56px;
	background-color: #ff6b00;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 3px solid #1c1c1c;
`

const StyledReaderIcon = styled(BookOpenText)`
	color: #1c1c1c;
	width: 28px;
	height: 28px;
`

const MessageText = styled.p`
	margin: 0 0 20px 0;
	font-size: 1.1rem;
	line-height: 1.7;
	white-space: pre-line;
`

const NavigationButton = styled.button`
	position: absolute;
	bottom: 15px;
	width: 32px;
	height: 32px;
	background-color: #ff6b00;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #e05a00;
	}

	&:disabled {
		background-color: #a0a0a0;
		cursor: not-allowed;
	}
`

const NextButton = styled(NavigationButton)`
	right: 15px;
`

const CloseButton = styled(NavigationButton)`
	right: 15px;
`

const StyledChevronRight = styled(ChevronRight)`
	color: #1c1c1c;
	width: 22px;
	height: 22px;
`

const StyledX = styled(X)`
	color: #1c1c1c;
	width: 20px;
	height: 20px;
`

type Props = {
	initialContent?: string[]
	isVisibleInitially?: boolean
	onAllMessagesShown?: () => void
}

export default function MessageBox({
	initialContent = [],
	isVisibleInitially = false,
	onAllMessagesShown,
}: Props) {
	const [messages, setMessages] = useState<string[]>(initialContent)
	const [isVisible, setIsVisible] = useState(
		isVisibleInitially && initialContent.length > 0
	)
	const [currentIndex, setCurrentIndex] = useState(0)
	const isLastMessage = currentIndex === messages.length - 1

	useEffect(() => {
		if (initialContent && initialContent.length > 0) {
			setMessages(initialContent)
			setCurrentIndex(0)
			setIsVisible(true)
		} else {
			setMessages([])
			setIsVisible(false)
		}
	}, [initialContent])

	const hide = () => {
		setIsVisible(false)
		if (onAllMessagesShown) {
			onAllMessagesShown()
		}
	}

	const handleNextMessage = () => {
		if (currentIndex < messages.length - 1) {
			setCurrentIndex(prevIndex => prevIndex + 1)
		} else {
			hide()
		}
	}

	if (!isVisible || messages.length === 0) {
		return null
	}

	return (
		<Overlay $isVisible={isVisible}>
			<MessageBoxWrapper>
				<IconContainer>
					<StyledReaderIcon />
				</IconContainer>
				<MessageText>{messages[currentIndex]}</MessageText>
				{isLastMessage ? (
					<CloseButton onClick={handleNextMessage} aria-label='Закрыть'>
						<StyledX />
					</CloseButton>
				) : (
					<NextButton onClick={handleNextMessage} aria-label='Далее'>
						<StyledChevronRight />
					</NextButton>
				)}
			</MessageBoxWrapper>
		</Overlay>
	)
}
