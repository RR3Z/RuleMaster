import styled from 'styled-components'

const ButtonContainer = styled.div`
	position: relative;
	display: inline-block;
`

const ButtonWrapper = styled.button<{
	$background: string | null
	$disabled: boolean
}>`
	background: ${({ $background }) =>
		$background
			? `url(${$background}) center/cover no-repeat`
			: `url('/noImage.webp') center/cover no-repeat`};
	border: 2px solid ${({ $disabled }) => ($disabled ? '#777' : 'white')};
	border-radius: 3px;
	width: 60px;
	min-height: 60px;
	color: ${({ $disabled }) => ($disabled ? '#aaa' : 'inherit')};
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
	user-select: none;

	&:hover {
		border: 2px solid ${({ $disabled }) => ($disabled ? '#777' : 'red')};
	}
`

const Tooltip = styled.div`
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
		opacity: 1;
	}
`

type Props = {
	buttonActivity: boolean
	id: string
	imageFilePath?: string
	tooltipText?: string
	onClick: () => void
}

export default function ActionButton({
	onClick,
	buttonActivity,
	imageFilePath,
	id,
	tooltipText = 'Здесь должна быть инфа',
}: Props) {
	return (
		<ButtonContainer id={id}>
			<Tooltip>{tooltipText}</Tooltip>
			<ButtonWrapper
				disabled={!buttonActivity}
				$disabled={!buttonActivity}
				$background={imageFilePath ?? null}
				onClick={onClick}
			/>
		</ButtonContainer>
	)
}
