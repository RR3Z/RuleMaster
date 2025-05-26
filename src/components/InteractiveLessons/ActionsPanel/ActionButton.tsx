import styled from 'styled-components'

const ButtonContainer = styled.div`
	position: relative;
	display: inline-block;
`

const ButtonWrapper = styled.button<{
	$background: string | null
	$disabled: boolean
}>`
	background: ${({ $background, $disabled }) =>
		$disabled
			? '#33333350'
			: $background
			? `url(${$background}) center/cover no-repeat`
			: '#0000001c'};
	border: 1px solid ${({ $disabled }) => ($disabled ? '#777' : 'white')};
	border-radius: 3px;
	width: 60px;
	min-height: 60px;
	color: ${({ $disabled }) => ($disabled ? '#aaa' : 'inherit')};
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

	&:hover {
		border: 1px solid ${({ $disabled }) => ($disabled ? '#777' : 'red')};
	}
`

const Tooltip = styled.div<{ $disabled: boolean }>`
	position: absolute;
	bottom: 110%;
	background: #00000093;
	color: white;
	padding: 5px;
	border-radius: 4px;
	font-size: 0.9rem;
	white-space: nowrap;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;

	${ButtonContainer}:hover & {
		opacity: ${({ $disabled }) => ($disabled ? 0 : 1)};
	}
`

type Props = {
	buttonActivity: boolean
	imageFilePath?: string
	tooltipText?: string
	onClick: () => void
}

export default function ActionButton({
	onClick,
	buttonActivity,
	imageFilePath,
	tooltipText = 'Здесь должна быть инфа',
}: Props) {
	return (
		<ButtonContainer onClick={onClick}>
			<Tooltip $disabled={!buttonActivity}>{tooltipText}</Tooltip>
			<ButtonWrapper
				$disabled={!buttonActivity}
				$background={imageFilePath ?? null}
			>
				1
			</ButtonWrapper>
		</ButtonContainer>
	)
}
