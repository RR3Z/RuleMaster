import styled from 'styled-components'
import { breakpoints } from '../breakpoints'

const Button = styled.button<{ $isActive: boolean }>`
	border: ${({ $isActive }) =>
		$isActive ? '2px solid #ff6600' : '2px solid #b94a00'};
	border-radius: 3px;
	border-bottom: none;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	padding: 3px 6px;
	min-width: 55px;
	background: none;
	transition: border 0.15s ease-in-out, box-shadow 0.2s ease-in-out;
	box-shadow: ${({ $isActive }) =>
		$isActive ? '0 0 8px rgba(255, 100, 0, 0.8)' : 'none'};
	flex: 1;
	font-size: 0.5rem;

	@media (min-width: ${() => breakpoints.sm}) {
		font-size: 0.65rem;
	}

	@media (min-width: ${() => breakpoints.md}) {
		font-size: 0.85rem;
	}

	@media (min-width: ${() => breakpoints.lg}) {
		font-size: 1rem;
	}

	@media (min-width: ${() => breakpoints.xl}) {
		font-size: 1.2rem;
	}

	@media (min-width: ${() => breakpoints.xxl}) {
		font-size: 1.5rem;
	}
`

type Props = {
	onClick: () => void
	name: string
	image?: string
	tabName: string
	activeTab: string
}

export default function MenuControlButton({
	onClick,
	name,
	tabName,
	activeTab,
	image,
}: Props) {
	return (
		<Button onClick={onClick} $isActive={tabName === activeTab}>
			{image ? (
				<img
					src={image}
					alt={name}
					style={{ maxHeight: '20px', maxWidth: '20px' }}
				/>
			) : (
				name
			)}
		</Button>
	)
}
