import { breakpoints } from '@/components/InteractiveLessons/breakpoints'
import styled from 'styled-components'

const Button = styled.button`
	border: 2px solid #b5b3a4;
	background: #f9f8ea;
	border-radius: 3px;
	padding: 3px 6px;
	width: 100%;
	transition: background 0.1s ease;
	font-size: 1.5rem;

	&:hover {
		background: #e6e5d8;
	}

	&:active {
		background: #d1d0c5;
	}

	@media (max-width: ${() => breakpoints.xl}) {
		font-size: 1rem;
	}

	@media (max-width: ${() => breakpoints.md}) {
		font-size: 0.85rem;
	}

	@media (max-width: ${() => breakpoints.sm}) {
		font-size: 0.8rem;
	}
`

type Props = {
	id: string
	name: string
	onClick: () => void
}

export default function DiceRollerTabButton({ id, name, onClick }: Props) {
	return (
		<Button id={id} onClick={onClick}>
			{name}
		</Button>
	)
}
