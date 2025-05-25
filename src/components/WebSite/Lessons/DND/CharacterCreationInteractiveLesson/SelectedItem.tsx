import { X } from 'lucide-react'
import styled from 'styled-components'

const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
`

const Text = styled.span`
	font-size: 1.2rem;
	font-weight: 400;

	@media (max-width: 2560px) {
		font-size: 1.7rem;
	}

	@media (max-width: 1920px) {
		font-size: 1.2rem;
	}

	@media (max-width: 1280px) {
		font-size: 1.1rem;
	}

	@media (max-width: 1024px) {
		font-size: 0.9rem;
	}
`

const Button = styled.button`
	cursor: pointer;
	color: #dd1f42;
	padding: 0;
	min-width: 40px;
	min-height: 40px;

	&:hover {
		color: #ff95a9;
	}
`

const XIcon = styled(X)`
	width: 100%;
	height: 100%;
`

type Props = {
	text: string
	item: string
	onClick: () => void
}

export default function SelectedItem({ text, item, onClick }: Props) {
	return (
		<MainContainer>
			<Text>
				<b>{text}</b> <u>{item}</u>
			</Text>
			<Button onClick={onClick} title='Очистить выбор'>
				<XIcon />
			</Button>
		</MainContainer>
	)
}
